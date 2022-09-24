const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
const helper = require('./helper')
const Blog = require('../models/blogs')
const User = require('../models/users')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
let token = null;
let dummyUserId = null;

// cleans the test DB and re-inserts the helper blogs
afterAll(() => {
  mongoose.connection.close();
})

beforeAll(async () => {
  await User.deleteMany({});
  const hashedPassword = await bcrypt.hash('12345', 10)
  const newUser = new User({
    name: 'josh',
    username: 'josh12345',
    hashedPassword
  }) // creates a new user
  await newUser.save();
  const response = await api.post('/api/login').send({
    password: '12345',
    username: 'josh12345'
  });
  expect(response.body.username).toBe('josh12345') // saves it and logs in correctly
  token = response.body.token;
  dummyUserId = newUser._id;
}, 50000)

describe('Blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.manyBlogs) {
      blog.user = dummyUserId;
      let newBlog = new Blog(blog)
      await newBlog.save();
    }
  }, 5000000) // wait a bit more to make sure that all elements are loaded up.

  test('One blog', async () => {
    const response = await api.get('/api/blogs')
    console.log(`response: status ; ${response.statusCode}`)
    expect(totalLikes([response.body[0]])).toBe(7)
  })
  test('Many blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(totalLikes(response.body)).toBe(36)
  })
  test('Empty array', () => {
    expect(totalLikes([])).toBe(0)
  })
  test('Most popular blog', async () => {
    const response = await api.get('/api/blogs')
    expect(favoriteBlog(response.body)).toEqual({ title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 });
  })
  test('Most blogs written', async () => {
    const response = await api.get('/api/blogs')
    expect(mostBlogs(response.body)).toEqual({ author: "Robert C. Martin", blogs: 3 })
  })
  test('Most liked of all blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(mostLikes(response.body)).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
  })
  test('Correctly returns id', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
    }
  })
  test('Adds and removes a new blog', async () => {
    const aBlog = {
      author: "testman2000",
      title: "the joy of testing",
      url: "testing.com",
      likes: 99,
    };
    const sentBlog = await api.post('/api/blogs').send(aBlog).set('Authorization', `Bearer ${token}`)
    console.log(sentBlog.body)
    expect(sentBlog.status).toBe(201)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(7)
    const deleteAnswer = await api.delete(`/api/blogs/${sentBlog.body.id}`).set('Authorization', `Bearer ${token}`)
    expect(deleteAnswer.statusCode).toBe(204)
  })
  test('Incomplete blog gets caught', async () => {
    const newBlog = {
      title: "The nature of Miami!",
      author: "Ricardo Fort",
    }
    const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(400);
  })
  test('Blog is deleted correctly', async () => {
    const response = await api.get('/api/blogs')
    const validID = response.body[0].id
    const deleteResponse = await api.delete(`/api/blogs/${validID}`).set('Authorization', `Bearer ${token}`)
    console.log(`Valid ID is ${validID}`)

    expect(deleteResponse.status).toBe(204);
  })
  test('blog is updated correctly.', async () => {
    const response = await api.get('/api/blogs')
    let aNote = response.body[0]
    aNote = { ...aNote, likes: aNote.likes + 1 }
    const id = aNote.id;
    const answer = await api.put(`/api/blogs/${id}`).send(aNote)
    expect(answer.status).toBe(204)
    // query the DB again to make sure it was saved correctly.
    const savedNote = await api.get(`/api/blogs/${id}`)
    expect(aNote).toEqual(savedNote.body)
  })
})

describe('Users', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const singleUser = new User({
      name: 'josh',
      hashedPassword: 'longencryptedpasswordhere',
      username: '12345enthusiast'
    })
    await singleUser.save();
  })
  test('short username/password is rejected', async () => {
    const aUser = {
      username: 'ab',
      password: 'a',
      name: 'typo'
    }
    const serverResponse = await api.post('/api/users').send(aUser)
    expect(serverResponse.statusCode).toBe(401);
    expect(serverResponse.body).toEqual({ error: 'username or password too short' });
  })
  test('duplicate username rejected', async () => {
    const newUser = {
      name: 'richard',
      password: 'passwordgoeshere',
      username: '12345enthusiast'
    }
    const serverResponse = await api.post('/api/users').send(newUser)
    expect(serverResponse.statusCode).toBe(401);
    expect(serverResponse.body).toEqual({ error: 'duplicate username found' })

  })
})



