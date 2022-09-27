const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');


loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  if (!(username || password)) { return response.status(400) }
  const user = await User.findOne({ username })
  const passwordIsCorrect = (user === null) ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordIsCorrect)) { return response.status(401) }

  const userForToken = { username: user.username, id: user._id }
  const token = jwt.sign(userForToken, process.env.SECRET) // expires in three hours

  response.json({ token, username: user.username, name: user.name });
})

module.exports = loginRouter

