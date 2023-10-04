const { HttpError } = require('../../helpers');
const { ContactModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findById(contactId).select('-_id');

  if (!result) {
    throw HttpError(404);
  }
  return res.status(200).json({ code: 200, data: result });
};

module.exports = ctrlWrapper(getById);
