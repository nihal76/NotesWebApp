const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();


const router = express.Router();
const User = require('../models/Users')

// Signup route
router.post('/signup' ,async (req, res) => {
  try {
    const { username,email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create a new user
    const newUser = new User({
      username : username,
      email : email,
      password: hashedPassword
    });
      console.log('newuser :',newUser);

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('username', username);
    console.log('password', password);
    // Find the user by username
    const user = await User.findOne({ username });
    console.log(user)
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid  password" });
    }

    // Generate JWT token
   const token = jwt.sign(
     { userId: user._id, username: user.username },
     process.env.SECRET_KEY,
     { expiresIn: "1h" } 
   );

   res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;