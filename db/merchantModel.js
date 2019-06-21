const mongoose = require('mongoose');

const ObjectIdType = mongoose.Schema.Types.ObjectId;

// Merchant schema
const merchantSchema = mongoose.Schema({
  merchantID: {
    type: String,
    index: true,
  },
  otp: { type: Number },
  email: { type: String, require: true },
  password: { type: String, require: true },
  fullName: String,
  phone: String,
  profilePic: String,
  city: String,
  zip: Number,
  dateOfBirth: Date,
  companyName: String,
  isActiveAccount: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  state: String,
  bankDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bankDetails',
  },
  panCardNumber: String,
  adharCardNumber: String,
}, {
  timestamps: { createdAt: 'created', updatedAt: 'modified' },
  versionKey: false,
});

// Merchant model
module.exports = mongoose.model('merchant', merchantSchema);
