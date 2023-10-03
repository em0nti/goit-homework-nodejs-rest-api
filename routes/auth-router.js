const express = require('express');
const { validateBody } = require('../decorators');
const { userRegistrationSchema } = require('../schemas');
const userController = require('../controllers');

const router = express.Router();

// const userLoginValidate = validateBody(userLoginSchema);
const userRegistrationValidate = validateBody(userRegistrationSchema);

router.post(
  '/register',
  userRegistrationValidate,
  userController.userRegistration
);

module.exports = router;
