const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (_, receivedObject) => {
    receivedObject.id = receivedObject._id.toString();
    delete receivedObject.__v;
    delete receivedObject._id;
    delete receivedObject.hashedPassword;
  }
})

module.exports = mongoose.model('User', userSchema);
