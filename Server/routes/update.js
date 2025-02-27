const express = require("express");
const Notes = require("../models/Notes");
const Users = require("../models/Users");
const authMiddleware = require("./middleware/authenticate");
const router = express.Router();

router.put('/:userName', async (req,res) => {
   const userName = req.params.userName
   console.log(userName)
      const { username, email } = req.body;
     const updated = await Users.findOneAndUpdate({username : userName},{username,email},{new : true})
     console.log(updated)
     res.json(updated)
})

module.exports = router