const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Listening to PORT ${config.PORT}`)
  logger.info(`NODE_ENV = ${process.env.NODE_ENV}`)
  logger.info(`Connecting to URI ${config.MONGODB_URI}`)
})
