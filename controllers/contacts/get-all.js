const { HttpError } = require('../../helpers');
const { ContactModel } = require('../../models');
const { ctrlWrapper } = require('../../decorators');

// Create - add
// Read   - getAll
// ReadOne - getById
// Update  - updateById
// Delete  - deleteById

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await ContactModel.find({ owner }, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(400, 'Unable to fetch data');
  }
  return res
    .status(200)
    .json({ code: 200, data: result, quantity: result.length });
};

module.exports = ctrlWrapper(getAll);
