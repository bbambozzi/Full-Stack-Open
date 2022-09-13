const logger = require('./logger')

const requestLogger = (request, response, next) => {
  console.log(`Method : ${request.method}`)
  console.log(`Path : ${request.path}`)
  console.log(`Body : ${request.body}`)
  next();
}

const unknownEndpoint = (request, response, next) => {
  response.status(400).json({ error: 'unknown endpoint' }).end();
}


// handle MongoDB mongoose specific errors.
const errorHandler = (error) => {
  logger.error(`${error.message}`)
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'wrongly formatted ID' })
  }
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: `${error.message}` })
  }
  next(error);
}


module.exports = { requestLogger, unknownEndpoint, errorHandler }
