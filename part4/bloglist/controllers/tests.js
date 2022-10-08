// make a separate tests router for deleting all notes
const Blog = require('../models/blogs.js');
const User = require('../models/users')

const express = require('express');
const testsRouter = express.Router();

testsRouter.post('/clear', async (_, response) => { // clears the db, be careful!
  await User.deleteMany({});
  await Blog.deleteMany({})
  response.status(204).end();
})

module.exports = testsRouter
