// grabs the token, decrypts and adds the user to the request.
const jwt = require('jsonwebtoken')

const userExtractor = (request, _, next) => {
  if (request.headers.authorization) {
    console.log('AUTH RECEIVED!')
    console.log(`AUTH HEADER ${request.headers.authorization}`)
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    if (token) {
      const user = jwt.decode(token, process.env.SECRET);
      request.user = user
      console.log(`user extracted ${user}`)
    }
  }
  next();
}
module.exports = userExtractor
