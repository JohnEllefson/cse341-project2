'use strict';

// Import the required modules
const express = require('express');
const armiesController = require('../controllers/armies');

// Create a new router
const router = express.Router();

// Return all contacts
router.get(
  '/',
  armiesController.getAll
  // #swagger.description = 'Return all armies in the database.'
);

// Return a single contact
router.get(
  '/:id',
  armiesController.getSingle
  // #swagger.description = 'Return a single army by ID from the database.'
);

// Delete a single contact
router.delete(
  '/:id',
  armiesController.deleteSingle
  // #swagger.description = 'Delete a single army by ID from the database.'
);

// Create a new contact
router.post(
  '/',
  armiesController.createSingle
  // #swagger.description = 'Create a new army in the database.'
);

// Update a single contact
router.put(
  '/:id',
  armiesController.updateSingle
  // #swagger.description = 'Update a single army by ID in the database.'
);

module.exports = router;
