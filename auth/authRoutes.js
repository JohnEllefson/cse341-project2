'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const router = express.Router();

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    const { googleId, username, email } = req.user;

    try {
      // Check if the user exists
      let user = await User.findOne({ googleId });

      if (!user) {
        // Create new user
        user = new User({
          googleId,
          username,
          email,
          role: 'user' // Default role
        });
        await user.save();
      } else {
        // Update user info if changed
        if (user.username !== username || user.email !== email) {
          user.username = username;
          user.email = email;
          await user.save();
        }
      }

      // Create JWT with user info
      const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Send JWT to client
      res.json({
        message: 'Login successful',
        token,
        user: { username: user.username, email: user.email, role: user.role }
      });
    } catch (err) {
      console.error('Error during OAuth callback:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
