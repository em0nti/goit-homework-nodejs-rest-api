const contactsControllers = require('./contacts');

const {
  userRegistration,
  userLogin,
  userLogout,
} = require('./auth-controller');

module.exports = {
  contactsControllers,
  userRegistration,
  userLogin,
  userLogout,
};
