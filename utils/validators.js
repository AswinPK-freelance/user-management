const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ message: errors.array()[0]?.msg || "Internal Server Error", data: null });
  }
  next();
};

module.exports = {
  validate
};