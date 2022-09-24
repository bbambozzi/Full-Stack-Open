const blogsRouter = require('express').Router();
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (_, response) => {
  const allBlogs = await Blog.find({}).populate('user')
  response.status(200).send(allBlogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  // sure
  const singleBlog = await Blog.findById(id).populate('user')
  return singleBlog ? response.status(200).json(singleBlog).end() : response.status(404).json({ error: 'not found' })
})


blogsRouter.post('/', async (request, response) => {
  const username = request.user;
  const id = username.id;
  const { title, author, url, likes } = request.body;
  if (!title || !author || !url) { return response.status(400).json({ error: 'incomplete blog' }) }
  if (!username) { return response.status(400).json({ error: 'token needed to post, please log in first.' }) }
  const user = await User.findById(id)
  if (!user) { return response.status(400).json({ error: 'user not found in database.' }) }
  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })// includes all of the users notes, can be too much.
  await newBlog.save()
  user.blogs.push(newBlog._id)
  await user.save();
  return response.status(201).json(newBlog);

})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const user = request.user;
  console.log(`RECEIVED USER : ${request.user}`)
  if (!user) { return response.status(400).json({ error: "user not provided" }) }
  const blog = await Blog.findById(id)
  if (blog) {
    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(id)
      return response.status(204).json({ success: 'blog deleted' })
    }
    return response.status(400).json({ 'error': 'token invalid' })
  }
  return response.status(404).json({ error: 'blog not found' })
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) { response.status(400).end() }
  const answer = await Blog.findByIdAndUpdate(id, {
    likes: body.likes,
    url: body.url,
    author: body.author,
    title: body.title,
  }).catch((error) => { response.status(400); next(error) })
  response.status(204).end();
})

module.exports = blogsRouter
