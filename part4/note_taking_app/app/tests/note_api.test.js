const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')



// jest global that runs before all the tests. redefines the DB.
beforeEach(async () => {
  await Note.deleteMany({})
  const noteObjectsArray = helper.newNotes.map(async note => {
    let newNote = new Note(note)
    await newNote.save();
  })
  await Promise.all(noteObjectsArray) // advanced: this promise.all makes sure that every promise in this array has been accepted before going forward.
})

describe('MongoDB API', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000) // second argument is the maximum time to await this async operation.


  test('content of the first note', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toEqual("html is easy!");
  })

  test('contains a predefined note', async () => {
    const response = await api.get('/api/notes')
    const contentArray = response.body.map(note => note.content)
    expect(contentArray).toContain('html is easy!')
  })

  test('length of notes(doublecheck if needed)', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.newNotes.length);
  })

  test('new note can be added correctly', async () => {
    const newNote = new Note({ content: "i like async/await", date: new Date() })
    await newNote.save();
    const allNotes = await Note.find({})
    expect(allNotes).toHaveLength(helper.newNotes.length + 1)
    await newNote.delete();
  })
})


// helppppppp chuddies!
// helpppppppsneed chuddies!
// this is run after all the tests in this file have been completed
afterAll(() => {
  mongoose.connection.close();
})
