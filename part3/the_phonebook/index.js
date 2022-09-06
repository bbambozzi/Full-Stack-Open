const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

/*
const password = process.argv[2]
const url = `mongodb+srv://morcipan:${password}@cluster0.pqkien0.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const mongooseSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Note = mongoose.model('Note', mongooseSchema)
*/
app.use(express.json());
app.use(cors());
app.use(express.static('build'))
morgan.token('bodyRequest', (req, res) => { return req.method === "POST" ? `${JSON.stringify(req.body)}` : '' });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :bodyRequest :req[content-length]'))



let notes = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


const getNewId = () => {
  const length = notes.length;
  return length + 1;
}

const randomBigInt = () => {
  return Math.floor(Math.random() * (100000))
}

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/api/info', (request, response) => {
  const length = notes.length;
  response.send(`<div>Phonebook has info for ${length} people.</div><div>Current time is ${new Date()}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const found = notes.find(note => note.id === id)
  if (found === undefined) {
    response.status(404).end();
  }
  response.status(200).json(found);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const found = notes.find(note => note.id === id)
  if (found === undefined) {
    response.status(204).end();
  }
  const newNotes = notes.filter(note => note.id !== id);
  notes = newNotes;
  response.status(204).end();
})

app.post('/api/persons/:id', (request, response) => {
  let receivedObject = (request.body);
  const receivedName = (receivedObject.name)
  const receivedNumber = (receivedObject.number)
  const errorMessage = { "name received": receivedName, "number received": receivedNumber }
  if (!receivedName || !receivedNumber) { response.status(400).json(errorMessage).end() }
  const checkDuplicateNumber = notes.find(note => note.number === receivedNumber)
  const checkDuplicateName = notes.find(note => note.name === receivedName)
  if (checkDuplicateName || checkDuplicateNumber) { response.status(400).json({ 'error': 'duplicate found' }).end() }
  else {
    receivedObject = { ...receivedObject, id: getNewId() }
    notes = notes.concat(receivedObject);
    response.status(200).json(request.body)
  }

})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
