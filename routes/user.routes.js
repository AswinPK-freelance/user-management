const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const { validate } = require('../utils/validators');
const { userValidationRules } = require('../utils/validationSchemas');
router.post('/', userValidationRules(), validate, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userValidationRules(), validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;