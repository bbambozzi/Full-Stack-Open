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


// handles NPM package-specific errors.
const errorHandler = (error) => {
  logger.error(`ERROR HANDLER : ${error.message}`)
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'wrongly formatted ID' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: `${error.message}` })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  logger.error(`ERROR HANDLER : ${error.message}`)

  next(error);
}


module.exports = { requestLogger, unknownEndpoint, errorHandler }
