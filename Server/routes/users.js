const express = require("express");
const Notes = require("../models/Notes");
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await Users.findOne({ username }).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ msg: "User not found" });
  }
});

module.exports = router