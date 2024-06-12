const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  gameTitle: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  progress: {
    type: String,
    default: "Not started"
  },
  review: {
    type: String,
    default: ""
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
