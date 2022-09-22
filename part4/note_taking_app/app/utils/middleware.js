const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info(`Method : ${request.method}`)
  logger.info(`Path : ${request.path}`)
  logger.info(`Body : ${JSON.stringify(request.body)}`)
  next();
}

const unknownEndpoint = (request, response, next) => {
  response.status(400).json({ error: 'unknown endpoint' }).end();
}


// handle MongoDB mongoose specific errors.
const errorHandler = (error) => {
  logger.error(`ERROR HANDLER : ${error.message}`)
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'wrongly formatted ID' })
  }
  if (error.name === 'ValidationError') {
    logger.error(`ERROR HANDLER : ${error}`)
    response.status(400).json({ error: `${error.message}` })
  }
  next(error);
}


module.exports = { requestLogger, unknownEndpoint, errorHandler }
