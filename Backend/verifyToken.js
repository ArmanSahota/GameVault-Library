// verifyToken.js
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization") ? req.header("Authorization").split(" ")[1] : null;
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) throw new Error("User not found");

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
