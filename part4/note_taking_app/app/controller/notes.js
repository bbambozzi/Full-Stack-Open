const notesRouter = require('express').Router(); // this is the router
const Note = require('../models/note')

notesRouter.get('/info', (request, response) => {
  response.send('<h1>Hello, world!</h1>')
})

notesRouter.get('/', (_, response) => {
  Note.find(({})).then((allNotes) => {
    response.json(allNotes)
  })
})

notesRouter.get('/:id', (request, response) => {
  let id = (request.params.id);
  if (id) {
    Note.findById(request.params.id).then((note) => {
      response.json(note)
    })
  }
  else {
    response.status(400).json({
      "Error": "Not found"
    })
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
    response.json(savedNote).end()
  }).catch((error) => {
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

