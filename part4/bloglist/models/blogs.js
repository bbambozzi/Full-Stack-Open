const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  }
})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog 
