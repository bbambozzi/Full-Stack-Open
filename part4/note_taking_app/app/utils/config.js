// Here we'll load the configuration from the .env file.

const config = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


module.exports = { PORT, MONGODB_URI }
