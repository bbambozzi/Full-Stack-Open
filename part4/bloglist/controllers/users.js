const usersRouter = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/users')

usersRouter.get('/', async (_, response) => {
  const allUsers = await User.find({}).populate('blogs')
  response.status(200).json(allUsers)
})

usersRouter.post('/', async (request, response) => {
  const { name, password, username } = request.body;
  if (!password || !username || !name) { return response.status(401).json({ error: 'name, username and password are required' }) }
  if (password.length < 3 || username.length < 3) { response.status(401).json({ error: 'username or password too short' }) }
  const allUsers = await User.find({});
  const notUnique = (allUsers.find(dbUser => dbUser.username === username))
  if (notUnique) { response.status(401).json({ error: 'duplicate username found' }) }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    name,
    username,
    hashedPassword
  })
  await newUser.save();
  response.status(201).end();
})

module.exports = usersRouter

