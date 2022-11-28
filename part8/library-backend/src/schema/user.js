const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 2,
  },
  favoriteGenre: String
})


module.exports = mongoose.model('User', userSchema)
