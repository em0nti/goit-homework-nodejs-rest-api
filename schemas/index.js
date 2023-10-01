const contactSchema = require('./contact-schema');
const updateFavoriteSchema = require('./favorite-schema');
const { userRegistrationSchema, userLoginSchema } = require('./user-schema');

module.exports = {
  contactSchema,
  updateFavoriteSchema,
  userRegistrationSchema,
  userLoginSchema,
};
