const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  identificationNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: 'unknown',
  },
  city: {
    type: String,
    default: 'unknown',
  },
});

module.exports = mongoose.model('User', UserSchema);
