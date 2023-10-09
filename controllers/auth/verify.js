const { HttpError } = require('../../helpers');
const { UserModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const verify = async (req, res, next) => {
	const { verificationToken } = req.params;

	const user = await UserModel.findOne({ verificationToken });

	if (!user) {
		throw HttpError(404);
	}

	user.verify = true;
	user.verificationToken = ' ';
	user.save();

	res.json({ code: 200, message: 'Verification successful' });
};

module.exports = ctrlWrapper(verify);
