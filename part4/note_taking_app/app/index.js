//
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on PORT ${config.PORT}`)
  logger.info(`Server connected to MongoDB URI ${config.MONGODB_URI}`)
})
