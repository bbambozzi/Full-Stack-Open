const { response, json } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const password = process.argv[2]

if (process.argv < 3) {
  console.log('No password received. Please input a password.')
  console.log(`Example : node index.js password123`)
  process.exit(1);
}

const url = `mongodb+srv://morcipan:${password}@cluster0.pqkien0.mongodb.net/notetaking?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})


noteSchema.set('toJSON',)

const Note = mongoose.model('Note', noteSchema)


// changes the toJSON method to make ID string and not return mongodb version.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let notes = [
  { id: 1, content: "HTML is easy", date: "2022-05-30T17:30:31.098Z", important: true },
  { id: 2, content: "Browser can execute only Javascript", date: "2022-05-30T18:39:34.091Z", important: false },
  { id: 3, content: "GET and POST are the most important methods of HTTP protocol", date: "2022-05-30T19:20:14.298Z", important: true },
  { id: 4, content: "This note is hard-coded in the back end!", date: "2022-05-30T19:20:14.298Z", important: true }
]

const generateMaxId = () => {
  const highestID = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
  return highestID + 1;
}

app.get('/', (request, response) => {
  response.send('<h1>Hello, world!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find(({})).then((allNotes) => {
    response.json(allNotes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  let id = Number(request.params.id);
  const foundNote = notes.find(note => note.id === id)
  if (foundNote) {
    response.json(foundNote)
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
    note.save().then(() => {
      response.status(200).end();
    })
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);
  response.status(204).end();
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
