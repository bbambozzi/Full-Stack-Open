const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('MongoDB password not provided. Please provide it as argument.')
  console.log('Example: node mongo.js password123')
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://morcipan:${password}@cluster0.pqkien0.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema(
  {
    content: String,
    date: Date,
    important: Boolean
  }
)

const Note = mongoose.model('Note', noteSchema)

// generates a new note
/*
mongoose
  .connect(url)
  .then(result => {
    console.log('Connected.')

    const note = new Note({
      content: `HTML is easy`,
      date: new Date(),
      important: true,
    })
    return note.save();
  }).then(() => {
    console.log('Note saved!')
    return mongoose.connection.close();
  })
  .catch(e => {
    console.log(`Error! : ${e}`)
  })
*/


Note.find(({})).then((result) => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close();
})
