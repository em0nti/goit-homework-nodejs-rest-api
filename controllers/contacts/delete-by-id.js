const { HttpError } = require('../../helpers');
const { ContactModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404);
  }
  return res.status(200).json({ code: 200, message: 'Contact deleted' });
};

module.exports = ctrlWrapper(deleteById);
