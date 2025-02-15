'use strict';

// Import the required modules
const express = require('express');
const generalsController = require('../controllers/generals');
const generalsValidate = require('../utilities/generals-validation');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all generals
router.get('/', utilities.handleErrors(generalsController.getAllGenerals));

// Return a single general
router.get(
  '/:id',
  generalsValidate.idRules(),
  generalsValidate.checkId,
  utilities.handleErrors(generalsController.getSingleGeneral)
);

// Delete a single general
router.delete(
  '/:id',
  generalsValidate.idRules(),
  generalsValidate.checkId,
  utilities.handleErrors(generalsController.deleteSingleGeneral)
);

// Create a new general
router.post(
  '/',
  generalsValidate.generalRules(),
  generalsValidate.checkGeneral,
  utilities.handleErrors(generalsController.createSingleGeneral)
);

// Update a single general
router.put(
  '/:id',
  generalsValidate.idRules(),
  generalsValidate.checkId,
  generalsValidate.generalRules(),
  generalsValidate.checkGeneral,
  utilities.handleErrors(generalsController.updateSingleGeneral)
);

module.exports = router;
