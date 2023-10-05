const { UserModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const logout = async (req, res) => {
	const { _id } = req.user;
	await UserModel.findByIdAndUpdate(_id, { token: null });

	res.status(204).json({
		message: 'Signout success',
	});
};

module.exports = ctrlWrapper(logout);
