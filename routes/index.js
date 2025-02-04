'use strict';

const express = require('express');
const router = express.Router();

// Mount the Swagger routes to serve the API documentation
router.use('/', require('./swagger'));

// Mount a sub-router to handle all routes under /armies
router.use('/armies', require('./armies'));

module.exports = router;
