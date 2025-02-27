const express = require("express");
const Notes = require("../models/Notes");
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

// for logout
router.delete('/:username', async (req,res) => {
  const user = req.params.username
  console.log('delete ? ', user)
  const User = await Users.findOne({username : user})
  console.log('logout ', User)
  await Notes.deleteMany({userId : User._id})
  await Users.findByIdAndDelete(User._id)
  res.status(200).json({res : 'user logged out'})
})

module.exports = router