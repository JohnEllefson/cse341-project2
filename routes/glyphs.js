'use strict';

// Import the required modules
const express = require('express');
const glyphController = require('../controllers/glyphs');
const glyphsValidate = require('../utilities/glyphs-validation');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all glyphs
router.get('/', utilities.handleErrors(glyphController.getAllGlyphs));

// Return a single glyph
router.get(
  '/:id',
  glyphsValidate.idRules(),
  glyphsValidate.checkId,
  utilities.handleErrors(glyphController.getSingleGlyph)
);

// Delete a single glyph
router.delete(
  '/:id',
  glyphsValidate.idRules(),
  glyphsValidate.checkId,
  utilities.handleErrors(glyphController.deleteSingleGlyph)
);

// Create a new glyph
router.post(
  '/',
  glyphsValidate.glyphRules(),
  glyphsValidate.checkGlyph,
  utilities.handleErrors(glyphController.createSingleGlyph)
);

// Update a single glyph
router.put(
  '/:id',
  glyphsValidate.idRules(),
  glyphsValidate.checkId,
  glyphsValidate.glyphRules(),
  glyphsValidate.checkGlyph,
  utilities.handleErrors(glyphController.updateSingleGlyph)
);

module.exports = router;
