const router = require("express").Router();
const verify = require("../verifyToken");

// Protected route to get user information
router.get("/", verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
