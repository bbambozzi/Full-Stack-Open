const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`Connecting to MongoDB, please wait..`)
mongoose.connect().then(() => {
  console.log('Connected to MongoDB.')
}).catch((error) => {
  console.log(`Failed to connect to MongoDB, Error : ${error})`)
});

const noteSchema = new mongoose.schema(
  {
    content: String,
    name: String,
    important: Boolean
  })


noteSchema.set('toJSON', {
  transform: ((document, receivedObj) => {
    receivedObj.id = receivedObj.id.toString();
    delete receivedObj.__v;
    delete receivedObj._id;
  })
});

module.exports = mongoose.model('Note', noteSchema)