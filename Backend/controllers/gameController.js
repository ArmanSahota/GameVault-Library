const jwt = require('jsonwebtoken');
const Game = require('../models/game');

exports.createGame = async (req, res) => {
  try {
    // Extract relevant fields from req.body
    const {
      game,
      console,
      model,
      year,
      price,
      progress,
      rating,
      review
    } = req.body;

    // Extract userId from JWT token
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is in the format: Bearer <token>
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    // Create a new Game instance with userId extracted from the token
    const newGame = new Game({
      userId,
      game,
      console,
      model,
      year,
      price,
      progress,
      rating,
      review
    });

    // Save the new game to the database
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    console.error('Error creating game:', err);
    res.status(500).json({ error: 'Error creating game' });
  }
};

// Controller method to get all games associated with the logged-in user
exports.getAllGames = async (req, res) => {
  try {
    // Fetch games where userId matches the logged-in user's ID
    const games = await Game.find({ userId: req.user._id });
    res.status(200).json(games);
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Error fetching games' });
  }
};

// Controller method to get a single game by ID
exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (err) {
    console.error('Error fetching game:', err);
    res.status(500).json({ error: 'Error fetching game' });
  }
};

// Controller method to update a game by ID
exports.updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json(updatedGame);
  } catch (err) {
    console.error('Error updating game:', err);
    res.status(500).json({ error: 'Error updating game' });
  }
};

// Controller method to delete a game by ID
exports.deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (err) {
    console.error('Error deleting game:', err);
    res.status(500).json({ error: 'Error deleting game' });
  }
};
