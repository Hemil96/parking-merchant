const mongoose = require('mongoose');

const ObjectIdType = mongoose.Schema.Types.ObjectId;

// MyParking schema
const myParkingSchema = mongoose.Schema({
  timeStart: {
    type: Date,
    require: true,
  },
  timeEnd: {
    type: Date,
    require: true,
  },
  name: {
    type: String,
  },
  contactPhone: {
    type: Number,
    require: true,
  },
  parkingCharges: {
    type: Number,
    require: true,
  },
  totalTwoWheelerSlots: {
    type: Number,
    default: 0,
  },
  totalFourWheelerSlots: {
    type: Number,
    default: 0,
  },
  merchantId: {
    type: ObjectIdType,
    ref: 'merchant',
  },
  premisesId: {
    type: ObjectIdType,
    ref: 'premises',
  },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'modified' },
  versionKey: false,
});

// MyParking model
module.exports = mongoose.model('myParking', myParkingSchema);
