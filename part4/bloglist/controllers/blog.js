const blogsRouter = require('express').Router();
const Blog = require('../models/blogs')


blogsRouter.get('/', (_, response) => {
  Blog.find({}).then((allBlogs) => {
    response.json(allBlogs).end();
  })
})

blogsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findById(id).then((singleBlog) => {
    if (singleBlog) {
      response.status(200).json(singleBlog).end();
    } else {
      response.status(404).json({ error: 'not found' }).end();
    }
  }).catch((error) => {
    next(error);
  })
})


blogsRouter.post('/', (request, response, next) => {
  const body = request.body;
  console.log(`body of post is ${body}`)
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  newBlog.save().then((answer) => {
    response.status(201).json(answer).end();
  }).catch((error) => {
    response.status(400).end();
    next(error);
  })
})

blogsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id).then((answer) => {
    response.status(204).end();
  }).catch(() => {
    next(error)
  })
})

module.exports = blogsRouter
