const express = require("express");
const Notes = require("../models/Notes");
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

// delete note
router.delete("/:noteid", authMiddleware, async (req, res) => {
  // find user id from note which has to be deleted
  const note = await Notes.findById(req.params.noteid);
  const userId = note.userId;
  console.log('note',note)
  // delete note
  await Notes.findByIdAndDelete(req.params.noteid);
  // find remaining notes
  const remainingNotes = await Notes.find({ userId  : userId}); 
  console.log('remainingNotes',remainingNotes)
  res.status(200).json({ message : 'note deleted',remainingNotes });
});

module.exports = router;
