const { ctrlWrapper } = require('../decorators');
const { HttpError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { UserModel } = require('../models');

// Read header: Read Authorization HTTP header
// Validation: Validation header on right format
// If YES -> Read token and Verify: Verify token
// If Verified -> Get payload (id) & Check for existing user: Query the Mongo DB
// If Exist -> Save user to req object
// Error handling: Status: 401 Unauthorized, ResponseBody: {  "message": "Not authorized"}

const authenticate = async (req, res, next) => {
	const { authorization = '' } = req.headers;
	const [type, token] = authorization.split(' ');

	if (type !== 'Bearer' || !token) {
		throw HttpError(401);
	}

	try {
		const { id } = jwt.verify(token, JWT_SECRET);
		const user = await UserModel.findById(id);

		if (!user) {
			throw HttpError(401, 'User not found');
		}

		req.user = user;

		next();
	} catch {
		throw HttpError(401);
	}
};

module.exports = ctrlWrapper(authenticate);
