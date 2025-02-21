'use strict';

const User = require('../models/user.model');

const updateUser = async (req, res) => {
  const { username, role } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Only admins can update roles
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update roles' });
    }

    if (username) user.username = username;
    if (role) user.role = role;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

module.exports = { updateUser };
