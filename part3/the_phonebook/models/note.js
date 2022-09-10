const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

// logging connection
console.log('Connecting to MongoDB')
mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB!')
}).catch((e) => {
  console.log(`Error : ${e}`)
})


// Schema configuration and field validation
const noteSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 4,
    required: true,
    validate: {
      validator: function(v) { return /\d{2,3}\-\d{7,8}/.test(v) } // regex validating phone numbers
    }
  }
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
