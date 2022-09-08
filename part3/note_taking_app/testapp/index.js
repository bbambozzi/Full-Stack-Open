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



app.post('/api/notes/:id', (request, response) => {
  const body = request.body;

  if (!body || !body.content) {
    response.status(400).json({
      "error": "CONTENT MISSING."
    }).end();
  }
  else {
    const note = new Note({
      "content": body.content,
      "important": body.important || false,
      "date": new Date(),
    })
    note.save().then((savedNote) => {
      response.json(savedNote)
    })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: `unknown endpoint` })
}



app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);
  response.status(204).end();
})

const errorHandler = (error, request, response, next) => {
  if (error === 'CastError') {
    response.status(400).send({ error: 'malformatted ID`' })
  }
}


app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
