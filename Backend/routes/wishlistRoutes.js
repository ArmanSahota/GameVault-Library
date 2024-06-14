const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const verifyToken = require("../verifyToken");

// Route to add a game to the wishlist
router.post("/", verifyToken, wishlistController.addItemToWishlist);

// Route to get all wishlist items for the authenticated user
router.get("/", verifyToken, wishlistController.getWishlist);

// Route to get a specific wishlist item by ID
router.get("/:id", verifyToken, wishlistController.getWishlistItem);

// Route to update a wishlist item by ID
router.put("/:id", verifyToken, wishlistController.updateWishlistItem);

// Route to delete a wishlist item by ID
router.delete("/:id", verifyToken, wishlistController.deleteWishlistItem);

module.exports = router;
