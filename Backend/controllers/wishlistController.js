// controllers/wishlistController.js
const Wishlist = require("../models/Wishlist");

// Route to add a game to the wishlist
exports.addItemToWishlist = async (req, res) => {
  const { gameTitle, platform, price } = req.body;
  try {
    const newGame = new Wishlist({
      userId: req.user._id,
      gameTitle,
      platform,
      price
    });
    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the game to the wishlist" });
  }
};

// Route to get all wishlist items for the authenticated user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user._id });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the wishlist" });
  }
};

// Route to get a specific wishlist item by ID
exports.getWishlistItem = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Wishlist.findById(id);
    if (!game) return res.status(404).json({ error: "Game not found in wishlist" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching for the game in wishlist" });
  }
};

// Route to update a wishlist item by ID
exports.updateWishlistItem = async (req, res) => {
  const { id } = req.params;
  const { price, progress, review } = req.body;
  try {
    const updatedGame = await Wishlist.findByIdAndUpdate(
      id,
      { price, progress, review },
      { new: true }
    );
    if (!updatedGame) res.status(404).json({ error: "Game not found in wishlist" });
    else res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the game in wishlist" });
  }
};

// Route to delete a wishlist item by ID
exports.deleteWishlistItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGame = await Wishlist.findByIdAndDelete(id);
    if (!deletedGame) res.status(404).json({ error: "Game not found in wishlist" });
    else res.json({ message: "Game removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while removing game from wishlist" });
  }
};
