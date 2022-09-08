require('dotenv').config(); // senstitive data is stored in .gitignore'd .env file.
const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan')
const Note = require('./models/note.js')


// unknown endpoint handler

app.use(express.json());
app.use(cors());
app.use(express.static('build'))
morgan.token('bodyRequest', (req, res) => { return req.method === "POST" ? `${JSON.stringify(req.body)}` : '' });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :bodyRequest :req[content-length]'))



app.get('/api/persons', (request, response) => {
  (Note.find({}).then((notes) => {
    response.json(notes).end();
  })).then(() => {
  })
})

app.get('/api/info', (request, response) => {
  const length = 'Many!'
  response.send(`<div>Phonebook has info for ${length} people.</div><div>Current time is ${new Date()}</div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Note.findById(id).then((person) => {
    if (person) {
      response.json(person).end();
    } else {
      response.status(404).end();
    }
  }).catch((error) => {
    next(error);
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const newNumber = request.body.number;
  if (!newNumber) { response.status(400).json({ error: 'no number provided' }).end() }
  Note.findByIdAndUpdate(id, { number: newNumber }).then((newObject) => {
    newObject.number = request.body.number;
    response.status(200).json(newObject)
  }).catch((error) => {
    next(error);
  })
})



app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id).then((result) => {
    response.status(204).end();
  }).catch((error) => {
    return next(error);
  })

})

app.post('/api/persons/:id', (request, response) => {
  const receivedObject = request.body;
  if (!receivedObject.name || !receivedObject.number) {
    response.status(400).json({ error: `Incomplete POST request` }).end()
  }
  const note = new Note({
    number: receivedObject.number,
    name: receivedObject.name
  })
  note.save().then(result => {
    console.log(`Note saved! Result ${result}`)
    response.status(200).json(result);
  }).catch((error) => {
    next(error);
  })
})




const errorHandler = (error, _, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') { // MongoDB ID error, let us return an API response.
    return response.status(400).send({ error: `malformatted ID` })
  }
  next(error) // if the error is not CastError, let Express handle it.
}

const unknownEndpoint = (_, response) => {
  response.status(400).json({ error: 'unknown endpoint' }).end();
}
app.use(unknownEndpoint)



// logging middleware
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
