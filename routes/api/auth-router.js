const express = require('express');
const { validateBody } = require('../../decorators');
const { userRegistrationSchema, userLoginSchema, userVerifySchema } = require('../../schemas');
const { authControllers } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const router = express.Router();

const userRegistrationValidate = validateBody(userRegistrationSchema);
const userLoginValidate = validateBody(userLoginSchema);
const userVerifyValidate = validateBody(userVerifySchema);

router.post('/register', userRegistrationValidate, authControllers.registration);

router.get('/verify/:verificationToken', authControllers.verify);

router.post('/verify', userVerifyValidate, authControllers.resendVerificationEmail);

router.post('/login', userLoginValidate, authControllers.login);

router.patch('/logout', authenticate, authControllers.logout);

module.exports = router;
