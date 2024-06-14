const Game = require('../models/game');

// Controller method to create a new game
exports.createGame = async (req, res) => {
  try {
    // Destructure relevant fields from req.body
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

    // Create a new Game instance with userId automatically populated from req.user._id
    const newGame = new Game({
      userId: req.user._id, // Ensure userId is populated from req.user._id
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
