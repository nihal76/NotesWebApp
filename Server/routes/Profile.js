const express = require("express");
const authMiddleware = require("./middleware/authenticate");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    res.json({ message: "Welcome to your profile", user: req.user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
