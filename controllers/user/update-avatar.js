const { ctrlWrapper } = require('../../decorators');
const sharp = require('sharp');
const path = require('path');
const { UserModel } = require('../../models');

const avatarDirPath = path.resolve('public', 'avatars');

const updateAvatar = async (req, res, next) => {
	const { _id } = req.user;
	const { path: temporaryFile, originalname } = req.file;
	const avatarFilename = `${_id}-${originalname}`;
	const avatarFilenamePath = path.join(avatarDirPath, avatarFilename);

	await sharp(temporaryFile).resize(250, 250).toFile(avatarFilenamePath);

	const avatarUrl = path.join('avatars', avatarFilename);
	await UserModel.findByIdAndUpdate(_id, { avatarUrl });
	res.json({ code: 200, avatarUrl });
};

module.exports = ctrlWrapper(updateAvatar);
