const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { HttpError } = require('../helpers');
const { UserModel } = require('../models');
const { ctrlWrapper } = require('../decorators');

const { JWT_SECRET } = process.env;

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

  // Save User: Save the new user data into the MongoDB database.
  const newUser = await UserModel.create({
    ...req.body,
    password: hashedPassword,
  });
  if (!newUser) {
    throw HttpError(400, 'Unable to safe in DB');
  }

  // Response: Send a success message back to the client(frontend).
  res.status(201).json({
    code: 201,
    message: 'User registered successfully',
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

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

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const generatedToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: '23h',
  });
  user.token = generatedToken;
  await user.save();
  res
    .status(200)
    .json({ code: 200, user: { email: user.email, token: user.token } });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await UserModel.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: 'Signout success',
  });
};

module.exports = {
  userRegistration: ctrlWrapper(registration),
  userLogin: ctrlWrapper(login),
  userLogout: ctrlWrapper(logout),
};
