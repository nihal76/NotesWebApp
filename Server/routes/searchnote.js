const express = require("express");
const Notes = require("../models/Notes");
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

// search notes
router.get("/", async (req, res) => {
  const username = req.query.username;
  const searchTerm = req.query.searchTerm;
  console.log(searchTerm)
  //  regex pattern
  const regex = new RegExp(searchTerm, "i");

  const results = await Notes.find({
    title : regex
  });

  if (results) {
    // if documents found
    res.status(200).json(results);
  }
  else{
  res.status(404).json({ msg: "Nothing found" });
  }
});

module.exports = router