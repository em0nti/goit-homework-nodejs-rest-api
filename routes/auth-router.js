const express = require('express');
const { validateBody } = require('../decorators');
const { userRegistrationSchema, userLoginSchema } = require('../schemas');
const userController = require('../controllers');
const { authenticate } = require('../middlewares');

const router = express.Router();

const userRegistrationValidate = validateBody(userRegistrationSchema);
const userLoginValidate = validateBody(userLoginSchema);

router.post(
  '/register',
  userRegistrationValidate,
  userController.userRegistration
);

router.post('/login', userLoginValidate, userController.userLogin);

router.patch('/logout', authenticate, userController.userLogout);

module.exports = router;
