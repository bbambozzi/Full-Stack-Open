const notesRouter = require('express').Router(); // this is the router
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null;
}

notesRouter.get('/info', (request, response) => {
  response.send('<h1>Hello, world!</h1>')
})

notesRouter.get('/', async (_, response) => {
  const allNotes = await Note.find(({}))
  response.json(allNotes)
})

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) { response.status(400).end(); }
  const note = await Note.findById(request.params.id).catch(response.status(404)).catch((_) => { response.status(404).end(); })
  if (note) {
    response.status(200).json(note)
  }
  else {
    response.status(404).end();
  }
})


notesRouter.put('/:id', (request, response, next) => {
  const queryID = request.body.id.toString();
  if (!queryID || queryID === undefined) { response.status(400).json({ error: 'note not found' }) }
  Note.findByIdAndUpdate(request.body.id, { important: request.body.important }, { new: true, runValidators: true, context: 'query' }).then((query) => {
    response.json(query).end();
  }).catch(error => {
    next(error);
  })
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) { return response.status(401).json({ error: 'token invalid or missing' }) }
  const user = await User.findById(decodedToken.id)
  if (user === undefined || !user) { return response.status(400).json({ answer: 'user or password incorrect' }); }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })
  const savedNote = await note.save();
  user.notes.push(savedNote._id)
  await user.save();
  response.status(201).json(savedNote);
})


notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).json({ 'success': 'note deleted' })
  }).catch((error) => {
    next(error);
  })
})
module.exports = notesRouter
