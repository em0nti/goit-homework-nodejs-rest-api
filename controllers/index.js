const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require('./contacts-controller');
const { userRegistration } = require('./auth-controller');

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  userRegistration,
};