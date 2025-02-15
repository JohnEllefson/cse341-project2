'use strict';

const { body, param, validationResult } = require('express-validator');
const wavesValidate = {};

/*************************************
 *  MongoId validation rules
 *************************************/
wavesValidate.idRules = () => {
  return [param('id').isMongoId().withMessage('Invalid ID')];
};

/*************************************
 *  Check MongoId validation
 *************************************/
wavesValidate.checkId = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

/*************************************
 *  Wave validation rules
 *************************************/
wavesValidate.waveRules = () => {
  return [
    body('name')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Wave name must be more than 1 character'),

    body('releaseDate').isISO8601().withMessage('Date must be in ISO 8601 format'),

    body('description')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Wave description must be more than 1 character')
  ];
};

/*************************************
 *  Wave validation check
 *************************************/
wavesValidate.checkWave = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = wavesValidate;
