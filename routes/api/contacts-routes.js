const express = require('express');
const contactsControllers = require('../../controllers');
const { isValidId } = require('../../middlewares');
const { contactSchema, updateFavoriteSchema } = require('../../schemas');
const { validateBody } = require('../../decorators'); 

const router = express.Router();

const userValidateMiddleware = validateBody(contactSchema);
const favoriteValidateMiddleware = validateBody(updateFavoriteSchema);

// Routes
// Get All
// Get One
// Add
// Update One
// Remove

router.get('/', contactsControllers.getAll);

router.get('/:contactId', isValidId, contactsControllers.getById);

router.post('/', userValidateMiddleware, contactsControllers.add);

router.delete('/:contactId', isValidId, contactsControllers.deleteById);

router.put(
  '/:contactId',
  isValidId,
  userValidateMiddleware,
  contactsControllers.updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  favoriteValidateMiddleware,
  contactsControllers.updateById
);

module.exports = router;
