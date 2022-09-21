const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
const helper = require('./helper')
const Blog = require('../models/blogs')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')


// cleans the test DB and re-inserts the helper notes.
beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.manyBlogs) {
    let newBlog = new Blog(blog)
    await newBlog.save();
  }
}, 5000000) // wait a bit more to make sure that all elements are loaded up.

afterAll(() => {
  mongoose.connection.close();
})

test('returns 1', () => {
  expect(dummy([])).toBe(1)
})

describe('Total likes', () => {
  test('One blog', async () => {
    const response = await api.get('/api/blogs')
    expect(totalLikes([response.body[0]])).toBe(7)
  })
  test('Many blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(totalLikes(response.body)).toBe(36)
  })
  test('Empty array', () => {
    expect(totalLikes([])).toBe(0)
  })
})

describe('Favorite blog', () => {
  test('Many blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(favoriteBlog(response.body)).toEqual({ title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 });
  })
})

describe('Most Blogs', () => {
  test('All the blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(mostBlogs(response.body)).toEqual({ author: "Robert C. Martin", blogs: 3 })
  })
})

describe('Most liked blog', () => {
  test('All the blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(mostLikes(response.body)).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
  })
})
describe('API', () => {
  test('Correctly returns id', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
    }
  })
  test('Adds and removes a new note', async () => {
    const aBlog = {
      author: "testman2000",
      title: "the joy of testing",
      url: "testing.com",
    };
    const sentBlog = await api.post('/api/blogs').send(aBlog)
    expect(sentBlog.body.likes).toBe(0)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(7)
    const deleteAnswer = await api.delete(`/api/blogs/${sentBlog.body.id}`)
    expect(deleteAnswer.statusCode).toBe(204)
  })
  test('Incomplete note gets caught', async () => {
    const newBlog = {
      title: "The nature of Miami!",
      author: "Ricardo Fort",
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(400);
  })
  test('Note is deleted correctly', async () => {
    // query the DB via API
    const response = await api.get('/api/blogs')
    // grab a valid ID from the DB
    const validID = response.body[0].id
    // API delete request
    const deleteResponse = await api.delete(`/api/blogs/${validID}`)
    expect(deleteResponse.status).toBe(204);
  })
  test('Note is updated correctly.', async () => {
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
