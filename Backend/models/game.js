// models/Game.js
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  console: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1950
  },
  game: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  progress: {
    type: String,
    enum: ["Not started", "In progress", "Completed"],
    default: "Not started"
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  review: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
