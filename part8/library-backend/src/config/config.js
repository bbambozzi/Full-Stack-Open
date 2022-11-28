require('dotenv').config({path: '../.env'})


const MONGODB_URI = process.env.MONGODB_URI
const PORT = 3001

module.exports = {MONGODB_URI, PORT}
