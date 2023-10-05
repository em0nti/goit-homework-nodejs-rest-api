const { ctrlWrapper } = require('../../decorators');

const current = async (req, res) => {
	const { email, subscription } = req.user;
	res.status(200).json({ code: 200, user: { email, subscription } });
};

module.exports = ctrlWrapper(current);
