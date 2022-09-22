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
    important: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }

  })


noteSchema.set('toJSON', {
  transform: ((document, receivedObj) => {
    receivedObj.id = receivedObj._id.toString();
    delete receivedObj.__v;
    delete receivedObj._id;
  })
});

const Note = mongoose.model('Note', noteSchema)
module.exports = Note;
