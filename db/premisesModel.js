const mongoose = require('mongoose');

const ObjectIdType = mongoose.Schema.Types.ObjectId;

// Premises schema
const premisesSchema = mongoose.Schema({
  premisesName: {
    type: String,
    require: true,
  },
  location: {
    lat: Number,
    long: Number,
  },
  images: {
    type: [String],
    require: false,
  },
  maxVehicleCapacity: {
    type: Number,
    require: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  merchantId: {
    type: ObjectIdType,
    ref: 'merchant',
  },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'modified' },
  versionKey: false,
});

// Premises model
module.exports = mongoose.model('premises', premisesSchema);
