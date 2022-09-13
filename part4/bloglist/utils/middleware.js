// This should handle the middleware:
// We should consider MongoDB specific errors and API requests to unknown endpoints.
// Furthermore, we should also log requests.


const logger = require('./logger')


const requestLogger = (request, response, next) => {
  logger.info(`Method : ${request.method}`)
  logger.info(`Path: ${request.path}`)
  logger.info(`Body: ${request.body}`)
  logger.info(`------`)
  next();
}

// handles MongoDB specific errors.
const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted ID' })
  }
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: `validation error : ${error.message}` })
  }
  next(error);
}

const unkownEndpoint = (_, response) => {
  response.status(404).json({ error: 'unkown endpoint' }).end()
}


module.exports = { requestLogger, errorHandler, unkownEndpoint }
