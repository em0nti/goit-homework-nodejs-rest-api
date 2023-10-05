const { HttpError } = require('../../helpers');
const { ContactModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }

  return res.status(200).json({ code: 200, data: result });
};

module.exports = ctrlWrapper(updateById);
