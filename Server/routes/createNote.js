
const express = require('express');
const Note = require('../models/Notes');
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

// create note
router.post('/:username',authMiddleware,async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  const username = req.params.username;
  // find the user id
 const user = await Users.findOne({username: username})
  const { title, description } = req.body;
  console.log(title, description);
  const newNote = new Note({
    title,
    description,
    userId: user._id
  });
  await newNote.save();
  res.status(201).json({ message: 'Note created successfully' });
});

module.exports = router;