// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../verifyToken"); // Middleware to verify JWT
const Game = require("../models/game"); // Assuming Game model is required for populating games

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(400).send("Email already exists");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();

    res.status(201).send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Email not found");

    // Validate the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.header("Authorization", `Bearer ${token}`).send({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get user profile (protected route)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password field
    if (!user) return res.status(404).send("User not found");

    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching user profile");
  }
});

// Fetch user's games (protected route)
router.get("/games", verifyToken, async (req, res) => {
  try {
    // Find the user and populate the games field
    const user = await User.findById(req.user._id).populate('games');
    if (!user) return res.status(404).send("User not found");

    res.send(user.games);
  } catch (err) {
    res.status(500).send("Error fetching user's games");
  }
});

module.exports = router;
