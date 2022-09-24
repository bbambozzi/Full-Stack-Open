
const tokenExtractor = (request, _, next) => {
  const authorizationHeader = request.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    request.token = token;
  }
  next();
}
module.exports = tokenExtractor;
