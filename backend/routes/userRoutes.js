const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 📝 Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered!' });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// 🔐 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid email or password!' });

    res.status(200).json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

module.exports = router;