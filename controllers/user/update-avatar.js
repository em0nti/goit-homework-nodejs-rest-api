const { ctrlWrapper } = require('../../decorators');

const updateAvatar = async (req, res, next) => {
	console.log(req.file);
	res.json({ message: 'Avatar updated succesfuly' });
};

module.exports = ctrlWrapper(updateAvatar);
