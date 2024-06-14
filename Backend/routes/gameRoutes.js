const express = require('express');
const router = express.Router();
const Game = require('../models/game'); // Import the Game model
const verifyToken = require("../verifyToken");
const User = require('../models/User'); // Import the User model

// GET all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET a single game by ID
router.get('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route to create a new game
router.post('/', verifyToken, async (req, res) => {
  try {
    // Destructure game details from request body
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

    // Create a new Game instance
    const newGame = new Game({
      userId: req.user._id, // Automatically populate userId from JWT token
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

    // Update user's games array in the users collection
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { games: savedGame._id } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found or could not update games array');
    }

    // Return the saved game in the response
    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Error creating game' });
  }
});


// PUT update a game by ID
router.put('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(updatedGame);
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ error: 'Error updating game' });
  }
});

// DELETE a game by ID
router.delete('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const deletedGame = await Game.findByIdAndDelete(gameId);

    if (!deletedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Error deleting game' });
  }
});

module.exports = router;
