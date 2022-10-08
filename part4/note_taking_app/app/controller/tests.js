// router for tests exclusively
const express = require('express');
const testsRouter = express.Router()
const User = require('../models/user');
const Notes = require('../models/note')

testsRouter.post('/reset', async (request, response, next) => {
  await User.deleteMany({});
  await Notes.deleteMany({})
  response.status(204).end();
})

module.exports = testsRouter;
