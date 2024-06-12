// In app.js or index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Import routes
const gameRoutes = require("./routes/gameRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit process with failure
});

// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json());

// Associate routes with their endpoints
app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
