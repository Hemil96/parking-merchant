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
  contactPhoneNumber: {
    type: Number,
    require: true,
  },
  myParkingCharges: {
    type: Number,
    require: true,
  },
  availableTwoWheelerSlots: {
    type: Number,
    default: 0,
  },
  availableFourWheelerSlots: {
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
