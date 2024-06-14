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
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  addedDate: {
    type: Date, // Store the date when the game was added
    default: Date.now
  }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
