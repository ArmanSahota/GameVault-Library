// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;