const mongoose = require('mongoose');

const ObjectIdType = mongoose.Schema.Types.ObjectId;

// Contest schema
const contestSchema = mongoose.Schema({
  contestID: {
    type: String,
    require: true,
    index: true,
  },
  title: String,
  timeStart: {
    type: Date,
    require: true,
  },
  timeEnd: {
    type: Date,
    require: true,
  },
  description: String,
  pricePool: {
    type: Number,
    require: true,
  },
  poolSize: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0,
    require: true,
  },
  entryFees: {
    type: Number,
    require: true,
    default: 0,
  },
  totoalWinners: {
    type: Number,
    require: true,
  },
  winningPolicy: {
    type: ObjectIdType,
    ref: 'winningPolicy',
    require: true,
  },
  playersJoined: {
    type: [ObjectIdType],
    ref: 'user',
  },
  totalSpots: {
    type: Number,
    default: 0,
    require: true,
  },
  filledSpots: {
    type: Number,
    default: 0,
  },
  emptySpots: {
    type: Number,
    default: 0,
  },
  isMultiSpot: {
    type: Boolean,
    default: false,
  },
  maxSpotPerUser: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  sport: {
    type: String,
    require: true,
  },
  leauge: {
    type: String,
  },
  matchObjectId: {
    type: ObjectIdType,
    ref: 'match',
    require: true,
  },

}, {
  timestamps: { createdAt: 'created', updatedAt: 'modified' },
  versionKey: false,
});

// Contest model
module.exports = mongoose.model('contest', contestSchema);
