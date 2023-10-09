const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { HttpError } = require('../../helpers');
const { UserModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const { JWT_SECRET } = process.env;

// Extract Data: Extract user data from the request body.
// Validation: Validate on existing the extracted data (required email, password, ). If error -> Status: 400 Bad Request, ResponseBody: Ошибка от Joi или другой библиотеки  валидации
// Check for Existing User: Query the MongoDB database to check if the user already exists.
// If NO -> throw Error -> Status: 401 Unauthorized, ResponseBody: {  "message": "Email or password is wrong"}
// If YES -> COMPARE req.body.pass with db.user.pass
// != -> throw Error -> Status: 401 Unauthorized, ResponseBody: {  "message": "Email or password is wrong"}
// = -> GENERATE token, SAVE to db.user.token, Response: Send a success message back to the client(frontend).

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw HttpError(400, 'Email and password are required');
	}

	const user = await UserModel.findOne({ email });
	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	if (!user.verify) {
		throw HttpError(401, 'Email not verify');
	}

	const isValidPassword = bcrypt.compareSync(password, user.password);
	if (!isValidPassword) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const generatedToken = jwt.sign({ id: user._id }, JWT_SECRET, {
		expiresIn: '23h',
	});
	user.token = generatedToken;
	await user.save();
	res.status(200).json({ code: 200, user: { email: user.email, token: user.token } });
};

module.exports = ctrlWrapper(login);
