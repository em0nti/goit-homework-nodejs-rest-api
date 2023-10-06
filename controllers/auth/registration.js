const bcrypt = require('bcryptjs');

const { HttpError } = require('../../helpers');
const { UserModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');
const gravatar = require('gravatar');

const registration = async (req, res) => {
	// Extract Data: Extract user data from the request body.
	const { email, password } = req.body;

	// Validation: Validate on existing the extracted data (required email, password, ).
	if (!email || !password) {
		throw HttpError(400, 'Email and password are required');
	}

	// Check for Existing User: Query the MongoDB database to check if the user already exists.
	const candidate = await UserModel.findOne({ email });
	if (candidate) {
		throw HttpError(409, 'User already exists');
	}

	// Password Hashing: If the user doesn't exist, hash the password using bcrypt.
	const hashedPassword = bcrypt.hashSync(password, 5);

	// Creating avatar
	const avatarUrl = gravatar.url(email);

	// Save User: Save the new user data into the MongoDB database.
	const newUser = await UserModel.create({
		...req.body,
		password: hashedPassword,
		avatarUrl,
	});
	if (!newUser) {
		throw HttpError(400, 'Unable to safe in DB');
	}

	// Response: Send a success message back to the client(frontend).
	res.status(201).json({
		code: 201,
		message: 'User registered successfully',
		user: { email: newUser.email, subscription: newUser.subscription, avatar: newUser.avatarUrl },
	});
};

module.exports = ctrlWrapper(registration);
