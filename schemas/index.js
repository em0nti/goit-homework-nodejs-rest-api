const contactSchema = require('./contact-schema');
const updateFavoriteSchema = require('./favorite-schema');
const { userRegistrationSchema, userLoginSchema, userVerifySchema } = require('./user-schema');

module.exports = {
	contactSchema,
	updateFavoriteSchema,
	userRegistrationSchema,
	userLoginSchema,
	userVerifySchema,
};
