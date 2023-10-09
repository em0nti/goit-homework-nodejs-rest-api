const registration = require('./registration');
const verify = require('./verify');
const login = require('./login');
const logout = require('./logout');
const resendVerificationEmail = require('./resend-verification-email');

module.exports = { registration, login, logout, verify, resendVerificationEmail };
