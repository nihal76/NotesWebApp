const express = require("express");
const Notes = require("../models/Notes");
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

// routes for handling sorting of Notes by Title
router.get("/sortbytitle",authMiddleware,  async (req, res) => {
  const username = req.query.username;
  let sortOrder = req.query.sortOrder;
  if (sortOrder === "ascending") {
    sortOrder = 1;
  } else if (sortOrder === "descending") {
    sortOrder = -1;
  }
  console.log("sort order:", sortOrder);
  console.log("username:", username);
  const user = await Users.findOne({ username: username });
  console.log("user notes to sort ..", user);
  const sortedNotes = await Notes.find({ userId: user._id })
    .sort({
      title: sortOrder,
    })
    .collation({ locale: "en" });
  console.log('notes sorted by title', sortedNotes)
  // return sorted notes
  res.status(200).json(sortedNotes);
});

// get notes
router.get("/:username", authMiddleware,
  async (req, res) => {
  const username = req.params.username;
  console.log('all notes ', username);
  // find the user id
  const user = await Users.findOne({username : username})
  // fetch all notes of user by their userid
  const notes = await Notes.find({ userId: user._id });
  if(notes.length > 0){
    res.status(200).json(notes);
  }
  else{
    res.status(404).json({message : 'No notes found'})
  }
})

module.exports = router;
