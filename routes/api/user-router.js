const express = require('express');
const { userControllers } = require('../../controllers');
const { authenticate, upload } = require('../../middlewares');

const router = express.Router();

router.get('/current', authenticate, userControllers.getCurrent);

router.patch('/avatars', authenticate, upload.single('avatar'), userControllers.updateAvatar);

module.exports = router;
