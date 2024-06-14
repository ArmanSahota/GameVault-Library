// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],

  wishlist: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlist"
  }
]
}, { timestamps: true }); // Array of game references


module.exports = mongoose.model('User', userSchema);
