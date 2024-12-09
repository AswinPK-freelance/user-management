const { body } = require('express-validator');

const userValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),

    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),

    body('age')
      .isInt({ min: 0 })
      .withMessage('Age must be a positive number')
  ];
};

module.exports = { userValidationRules }