const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const verifyToken = require("../verifyToken");


// Route to add a game to the wishlist
router.post("/wishlist", verifyToken, wishlistController.addItemToWishlist);


// Route to get all wishlist items for the authenticated user
router.get("/wishlist", verifyToken, wishlistController.getWishlist);

// Route to get a specific wishlist item by ID
router.get("/wishlist/:id", verifyToken, wishlistController.getWishlistItem);

// Route to update a wishlist item by ID
router.put("/wishlist/:id", verifyToken, wishlistController.updateWishlistItem);

// Route to delete a wishlist item by ID
router.delete("/wishlist/:id", verifyToken, wishlistController.deleteWishlistItem);

// Route to add a game to the wishlist



module.exports = router;
