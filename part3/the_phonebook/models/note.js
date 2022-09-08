const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

// logging connection
console.log('Connecting to MongoDB')
mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB!')
}).catch((e) => {
  console.log(`Error : ${e}`)
})

const noteSchema = mongoose.Schema({
  name: String,
  number: String,
})


// makes the toJSON response avoid returning mongoDB version and makes sure the id is a string and not an object.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export the ES6 module as a Note
module.exports = mongoose.model('Note', noteSchema)
