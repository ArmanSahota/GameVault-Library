// routes/gameRoutes.js
const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const verifyToken = require("../verifyToken");

// Route to create a new game
router.post("/", verifyToken, gameController.createGame);

// Route to get all games with pagination
router.get("/", gameController.getAllGames);

// Route to get a single game by ID
router.get("/:id", gameController.getGame);

// Route to update a game by ID
router.put("/:id", verifyToken, gameController.updateGame);

// Route to delete a game by ID
router.delete("/:id", verifyToken, gameController.deleteGame);

// Route to update the progress of a game by ID
router.put("/:id/progress", verifyToken, gameController.updateGameProgress);

// Route to get games by game engine
router.get("/engine", gameController.getGamesByEngine);

// Route to get games by price range
router.get("/price", gameController.getGamesByPrice);

// Route to get games by completion status
router.get("/completion", gameController.getGamesByCompletionStatus);

// Route to rate a game by ID
router.put("/:id/rate", verifyToken, gameController.rateGame);

// Route to review a game by ID
router.put("/:id/review", verifyToken, gameController.reviewGame);

// Route to get games by user ID
router.get("/user/:userId", verifyToken, gameController.getGamesByUserId);

module.exports = router;
