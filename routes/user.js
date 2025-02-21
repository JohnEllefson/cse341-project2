'use strict';

const express = require('express');
const { authenticateJWT } = require('../utilities/authentication');
const { updateUser } = require('../controllers/user');
const utilites = require('../utilities/index');

const router = express.Router();

// Update user info (only accessible by the user or admin)
router.put('/update', authenticateJWT, utilites.handleErrors(updateUser));

module.exports = router;
