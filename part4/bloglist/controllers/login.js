const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) { return response.status(401).json({ error: 'username and password are required' }) }
  const userInDb = await User.findOne({ username });
  if (!userInDb) { return response.status(404).json({ error: 'username not found' }) }
  const passwordIsCorrect = bcrypt.compare(password, userInDb.hashedPassword)
  if (!passwordIsCorrect) { return response.status(401).json({ error: 'password is incorrect' }) }
  const targetUserForToken = { username, id: userInDb._id } // username and objectid
  const token = jwt.sign(targetUserForToken, process.env.SECRET)
  response.status(200).send({ token, username })
})

module.exports = loginRouter
