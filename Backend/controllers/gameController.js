// controllers/gameController.js
const Game = require("../models/game");
const User = require("../models/User");

exports.createGame = async (req, res) => {
  const { console, model, year, game, price, progress, rating, review } = req.body;
  try {
    const newGame = new Game({
      userId: req.user._id,
      console,
      model,
      year,
      game,
      price,
      progress,
      rating,
      review
    });
    const savedGame = await newGame.save();

    await User.findByIdAndUpdate(req.user._id, { $push: { games: savedGame._id } });

    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating a game" });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching all games" });
  }
};

exports.getGame = async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the game" });
  }
};

exports.updateGame = async (req, res) => {
  const gameId = req.params.id;
  const updateData = req.body;
  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, updateData, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the game" });
  }
};

exports.deleteGame = async (req, res) => {
  const gameId = req.params.id;
  try {
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the game" });
  }
};

exports.updateGameProgress = async (req, res) => {
  const gameId = req.params.id;
  const { progress } = req.body;
  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, { progress }, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating game progress" });
  }
};
exports.getGamesByEngine = async (req, res) => {
  const engine = req.query.engine;
  try {
    const games = await Game.find({ engine });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching games by engine" });
  }
};

exports.getGamesByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const games = await Game.find({ price: { $gte: minPrice, $lte: maxPrice } });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching games by price range" });
  }
};

exports.getGamesByCompletionStatus = async (req, res) => {
  const status = req.query.status;
  try {
    const games = await Game.find({ progress: status });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching games by completion status" });
  }
};

exports.rateGame = async (req, res) => {
  const gameId = req.params.id;
  const { rating } = req.body;
  try {
    const game = await Game.findByIdAndUpdate(gameId, { rating }, { new: true });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while rating the game" });
  }
};

exports.reviewGame = async (req, res) => {
  const gameId = req.params.id;
  const { review } = req.body;
  try {
    const game = await Game.findByIdAndUpdate(gameId, { review }, { new: true });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while reviewing the game" });
  }
};

exports.getGamesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const games = await Game.find({ userId });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching games by user ID" });
  }
};