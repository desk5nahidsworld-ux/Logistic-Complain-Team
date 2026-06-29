const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, address } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'ইউজার ইতিমধ্যে বিদ্যমান' });
    }

    // Create new user
    user = new User({
      fullName,
      email,
      phone,
      password,
      address
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: '✅ রেজিস্ট্রেশন সফল',
      token,
      user: { id: user._id, email: user.email, fullName: user.fullName }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'ইউজার খুঁজে পাওয়া যায়নি' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'পাসওয়ার্ড ভুল' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      message: '✅ লগইন সফল',
      token,
      user: { id: user._id, email: user.email, fullName: user.fullName }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
