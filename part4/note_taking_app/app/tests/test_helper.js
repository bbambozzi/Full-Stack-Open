// helps for notes
const Note = require('../models/note')
const mongoose = require('mongoose')
const User = require('../models/user')


const newNotes = [
  { content: "html is easy!", important: false, date: new Date() },
  { content: "i love this course! testing is interesting!", important: false, date: new Date() },
  { content: "this course is great!", important: true, date: new Date() }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'this is made for extracting the ID', date: new Date() })
  await note.save();
  await note.delete();
  return note._id;
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { newNotes, nonExistingId, notesInDb, usersInDb }
