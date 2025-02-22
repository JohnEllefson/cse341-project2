'use strict';

const User = require('../models/user.model');

// Return all users (must be logged in to access)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found in database' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: 'Error getting users', error: err.message });
  }
};

// Return a single user (must be logged in to access)
const getSingleUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error getting user', error: err.message });
  }
};

// Delete a single user (only accessible by the user or admin)
const deleteSingleUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res
        .status(403)
        .json({ message: 'Only the user or admin can delete the selected user' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete user', error: error.message });
  }
};

// Update user info (only accessible by the user or admin)
const updateSingleUser = async (req, res) => {
  const { preferred_name, role } = req.body;

  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Only admins can update roles
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update roles' });
    }

    // Only the user or an admin can update the preferred name
    if (preferred_name && req.user.role !== 'admin' && req.user.userId !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Only the user or an admin can update the preferred name' });
    }

    if (preferred_name) user.preferred_name = preferred_name;
    if (role) user.role = role;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
};

module.exports = { updateSingleUser, getAllUsers, getSingleUser, deleteSingleUser };
