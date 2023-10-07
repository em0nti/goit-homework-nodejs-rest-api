const express = require('express');
const { validateBody } = require('../../decorators');
const { userRegistrationSchema, userLoginSchema } = require('../../schemas');
const { authControllers } = require('../../controllers');
const { authenticate, upload } = require('../../middlewares');

const router = express.Router();

const userRegistrationValidate = validateBody(userRegistrationSchema);
const userLoginValidate = validateBody(userLoginSchema);

router.post('/register', userRegistrationValidate, authControllers.registration);

router.post('/login', userLoginValidate, authControllers.login);

router.patch('/logout', authenticate, authControllers.logout);

router.get('/current', authenticate, authControllers.current);

router.patch('/avatars', authenticate, upload.single('avatar'), authControllers.updateAvatar);

module.exports = router;
