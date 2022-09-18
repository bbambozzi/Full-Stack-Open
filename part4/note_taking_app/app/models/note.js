const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minLength: 3,
      required: true

    },
    date: {
      type: Date,
      required: true,
    },
    important: Boolean
  })

// returns the note without the __v and _id and makes the ID a string instead of an object.
noteSchema.set('toJSON', {
  transform: ((_, receivedObj) => {
    receivedObj.id = receivedObj._id.toString();
    delete receivedObj.__v;
    delete receivedObj._id;
  })
});

module.exports = mongoose.model('Note', noteSchema)
