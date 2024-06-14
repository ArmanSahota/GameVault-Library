// controllers/wishlistController.js
const Wishlist = require("../models/Wishlist");

exports.addItemToWishlist = async (req, res) => {
  const { gameTitle, platform, price, model } = req.body; // Added 'model' from req.body

  try {
    const newGame = new Wishlist({
      userId: req.user._id,
      gameTitle,
      platform,
      price,
      model // Added 'model' field
    });

    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (error) {
    console.error('Error adding game to wishlist:', error);
    res.status(500).json({ error: "An error occurred while adding the game to the wishlist" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user._id });
    res.json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: "An error occurred while fetching the wishlist" });
  }
};

exports.getWishlistItem = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Wishlist.findById(id);
    if (!game) return res.status(404).json({ error: "Game not found in wishlist" });
    res.json(game);
  } catch (error) {
    console.error('Error searching for game in wishlist:', error);
    res.status(500).json({ error: "An error occurred while searching for the game in wishlist" });
  }
};

exports.updateWishlistItem = async (req, res) => {
  const { id } = req.params;
  const { gameTitle, platform, model, price } = req.body;
  try {
    const updatedGame = await Wishlist.findByIdAndUpdate(
      id,
      { gameTitle, platform, model, price },
      { new: true }
    );
    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found in wishlist" });
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the game in wishlist" });
  }
};


exports.deleteWishlistItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGame = await Wishlist.findByIdAndDelete(id);
    if (!deletedGame) res.status(404).json({ error: "Game not found in wishlist" });
    else res.json({ message: "Game removed from wishlist" });
  } catch (error) {
    console.error('Error removing game from wishlist:', error);
    res.status(500).json({ error: "An error occurred while removing game from wishlist" });
  }
};
