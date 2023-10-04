const { HttpError } = require('../../helpers');
const { ContactModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

const add = async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    throw HttpError(400, 'Name and Phone are required');
  }

  const result = await ContactModel.create({ ...req.body });
  if (!result) {
    throw HttpError(400, 'Unable to safe in DB');
  }
  return res.status(201).json({ code: 201, data: result });
};

module.exports = ctrlWrapper(add);
