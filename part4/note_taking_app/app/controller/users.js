const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (!password || !username || !name) { response.status(400).end(); return; }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (_, response) => {
  const allUsers = await User.find({})
  response.status(200).json(allUsers).end();
})

module.exports = usersRouter
