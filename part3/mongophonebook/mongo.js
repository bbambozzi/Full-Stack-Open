const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Missing password! Please enter a password.')
  console.log('Example: node mongo.js myPassword')
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://morcipan:${password}@cluster0.pqkien0.mongodb.net/phonebook?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  }
)


const Note = mongoose.model('Note', noteSchema)




// this is an all note query
if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    console.log('Connected! Querying notes..')
    Note.find(({})).then((allNotes) => {
      allNotes.forEach((note) => {
        console.log(`Note : ${note}`)
      })
    }).then(() => {
      mongoose.connection.close();
    })
  })

}


if (process.argv.length === 5) {
  mongoose.connect(url).then(() => {
    console.log('Connected!')
    const name = process.argv[3]
    const number = process.argv[4]
    const note = new Note({
      name: name,
      number: number
    })
    // this returns it to the next then chain
    return note.save();
  }).then(() => {
    console.log('Note saved successfully! Exiting...')
    mongoose.connection.close();
    process.exit(1)
  })

}


