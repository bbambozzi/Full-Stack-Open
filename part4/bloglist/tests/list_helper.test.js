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

// TODO handle async nature of the call, grab the response, and evaluate based on th response.
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
