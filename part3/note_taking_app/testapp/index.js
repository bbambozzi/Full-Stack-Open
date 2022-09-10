const { response, json } = require('express')
require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')



if (process.env.PORT) {
  console.log('Starting Application. Received PORT from .env..')
}
app.use(cors())
app.use(express.json())
app.use(express.static('build'))



app.get('/', (request, response) => {
  response.send('<h1>Hello, world!</h1>')
})

app.get('/api/notes', (_, response) => {
  Note.find(({})).then((allNotes) => {
    response.json(allNotes)
  })
})

app.get('/api/notes/:id', (request, response) => {
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


app.put('/api/notes/:id', (request, response, next) => {
  const queryID = request.body.id.toString();
  if (!queryID || queryID === undefined) { response.status(400).json({ error: 'note not found' }) }
  Note.findByIdAndUpdate(request.body.id, { important: request.body.important }, { new: true, runValidators: true, context: 'query' }).then((query) => {
    response.json(query).end();
  }).catch(error => {
    next(error);
  })
})


app.post('/api/notes', (request, response, next) => {
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


app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).json({ 'success': 'note deleted' })
  }).catch((error) => {
    next(error);
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: `unknown endpoint` })
}


const errorHandler = (error, request, response, next) => {
  if (error === 'CastError') {
    response.status(400).send({ error: 'malformatted ID`' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
}

app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
