const Joi = require('joi');

// Joi schema for validate user registration data
const userRegistrationSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'Password is required' }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),

  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
});

// Joi schema for user login data
const userLoginSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'Password is required' }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
});

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
};
