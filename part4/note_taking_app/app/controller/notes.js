const notesRouter = require('express').Router(); // this is the router
const Note = require('../models/note')

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
}
)


notesRouter.put('/:id', (request, response, next) => {
  const queryID = request.body.id.toString();
  if (!queryID || queryID === undefined) { response.status(400).json({ error: 'note not found' }) }
  Note.findByIdAndUpdate(request.body.id, { important: request.body.important }, { new: true, runValidators: true, context: 'query' }).then((query) => {
    response.json(query).end();
  }).catch(error => {
    next(error);
  })
})


notesRouter.post('/', (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save().then((savedNote) => {
    response.status(201).json(savedNote).end()
  }).catch((error) => {
    response.status(400).end();
    next(error);
  })
})


notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).json({ 'success': 'note deleted' })
  }).catch((error) => {
    next(error);
  })
})

module.exports = notesRouter

