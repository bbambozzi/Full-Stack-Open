const { response, json } = require('express')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controller/notes')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const testsRouter = require('./controller/tests')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

// handles mongoose promise-based connection
mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('Connected succesfully to the MongoDB URI!')
}).catch((error) => {
  logger.error(`ERROR, could not connect. Error : ${error}`)
})
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger) // logs all requests
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter) // sets relative path and connects to the router
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/tests', testsRouter)
}
app.use(middleware.unknownEndpoint) // handles unkown endpoint is no path is found
app.use(middleware.errorHandler) // handles errors, specifically MongoDB CastError or ValidationError.

module.exports = app

