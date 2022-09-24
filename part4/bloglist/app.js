const config = require('./utils/config')
const express = require('express')
const app = express();
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const userExtractor = require('./utils/userExtractor')

logger.info(`Connecting to MongoDB..`)
mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info(`Success! Connected to MongoDB!`)
}).catch((error) => {
  logger.error(`Error, could not connect to MongoDB : ${error}`)
})

// app.use('./static/') load the static frontend here
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


