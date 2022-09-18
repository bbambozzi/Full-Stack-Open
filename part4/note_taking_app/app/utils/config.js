// Here we'll load the configuration from the .env file.

const config = require('dotenv').config();

const PORT = process.env.PORT;
// change the database if we're in test mode to test against that specific DB.
const MONGODB_URI = (process.env.NODE_ENV === 'test') ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI }
