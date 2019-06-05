const mongoose = require('mongoose');

const ObjectIdType = mongoose.Schema.Types.ObjectId;

// Parking schema
const parkingSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  premisesName: {
    type: String,
    require: true,
  },
  zipCode: {
    type: Number,
    require: true,
  },
  areaSize: {
    type: String,
  },
  timeStart: {
    type: Date,
    require: true,
  },
  timeEnd: {
    type: Date,
    require: true,
  },
  contactEmail: {
    type: String,
    require: true,
  },
  contactPhone: {
    type: Number,
    require: true,
  },
  parkingChange: {
    type: Number,
    require: true,
  },
  totalTwoWheelerSlots: {
    type: Number,
    default: 0,
    require: true,
  },
  filledTwoWheelerSlots: {
    type: Number,
    default: 0,
  },
  emptyTwoWheelerSlots: {
    type: Number,
    default: 0,
  },
  totalFourWheelerSlots: {
    type: Number,
    default: 0,
    require: true,
  },
  filledFourWheelerSlots: {
    type: Number,
    default: 0,
  },
  emptyFourWheelerSlots: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    require: true,
  },
  location: {
    lat: Number,
    long: Number,
  },
  merchantId: {
    type: ObjectIdType,
    ref: 'merchant'
  }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'modified' },
  versionKey: false,
});

// Parking model
module.exports = mongoose.model('parking', parkingSchema);
