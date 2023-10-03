const { model, Schema } = require('mongoose');
const { handleSchemaError, runValidateAtUpdate } = require('./hooks');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.post('save', handleSchemaError);
userSchema.pre('findOneAndUpdate', runValidateAtUpdate);
userSchema.post('findOneAndUpdate', handleSchemaError);

module.exports = model('user', userSchema);
