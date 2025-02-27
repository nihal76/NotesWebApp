const express = require("express");
const Notes = require("../models/Notes");
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

// Edit note
router.put("/:noteid", async (req, res) => {
  const note  = await Notes.findById(req.params.noteid);
  console.log('note:',note);
  const { title, description } = req.body;
  console.log('updating note', title, description);
  const noteId = req.params.noteid;
    const updatedNote = await Notes.findByIdAndUpdate(noteId, { title, description })
    // return response by sending all notes with updated note
    const notes = await Notes.find({ userId : note.userId });
    res.status(200).json({ message: "Note updated successfully" , notes : notes});
})


module.exports = router;
