const handleSchemaError = (error, data, next) => {
    const { name, code } = error;
    if (name === 'MongoServerError' && code === 11000) {
      error.status = 409;
      error.message = 'Email already exist';
    } else {
      error.status = 400;
    }
  next();
};

const runValidateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};

module.exports = {
  handleSchemaError,
  runValidateAtUpdate,
};
