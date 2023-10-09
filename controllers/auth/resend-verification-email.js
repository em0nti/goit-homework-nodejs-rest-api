const { HttpError, sendMail } = require('../../helpers');
const { UserModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const resendVerificationEmail = async (req, res, next) => {
	const { email } = req.body;
	const user = await UserModel.findOne({ email });

	if (!user) {
		throw HttpError(404, 'Email not found');
	}

	if (user.verify) {
		throw HttpError(400, 'Email already verify');
	}

	// Send verification email
	await sendMail({
		to: email,
		subject: 'Contact app: you need to verify your email',
		html: `<a target="_blank" href="${process.env.BASE_URL}:${process.env.PORT}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
	});

	res.json({
		code: 200,
		message: 'Verify email resend success',
	});
};

module.exports = ctrlWrapper(resendVerificationEmail);
