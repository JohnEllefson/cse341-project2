'use strict';

// Import the required modules
const express = require('express');
const waveController = require('../controllers/waves');
const wavesValidate = require('../utilities/waves-validation');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all waves
router.get('/', utilities.handleErrors(waveController.getAllWaves));

// Return a single wave
router.get(
  '/:id',
  wavesValidate.idRules(),
  wavesValidate.checkId,
  utilities.handleErrors(waveController.getSingleWave)
);

// Delete a single wave
router.delete(
  '/:id',
  wavesValidate.idRules(),
  wavesValidate.checkId,
  utilities.handleErrors(waveController.deleteSingleWave)
);

// Create a new wave
router.post(
  '/',
  wavesValidate.waveRules(),
  wavesValidate.checkWave,
  utilities.handleErrors(waveController.createSingleWave)
);

// Update a single wave
router.put(
  '/:id',
  wavesValidate.idRules(),
  wavesValidate.checkId,
  wavesValidate.waveRules(),
  wavesValidate.checkWave,
  utilities.handleErrors(waveController.updateSingleWave)
);

module.exports = router;
