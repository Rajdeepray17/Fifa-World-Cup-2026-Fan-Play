import mongoose from 'mongoose';

/**
 * Player — National team squad member.
 * Designed for Squad Builder, Team Analytics, and Player Search systems.
 * Each nation carries a 26-man squad for the 2026 World Cup.
 */

const POSITIONS = [
  'GK', 'CB', 'LB', 'RB', 'LWB', 'RWB',
  'CDM', 'CM', 'CAM',
  'LM', 'RM', 'LW', 'RW',
  'ST', 'CF',
];

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Player name is required'],
      trim: true,
    },
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nation',
      required: [true, 'Nation reference is required'],
      index: true,
    },
    club: {
      type: String,
      default: '',
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      enum: POSITIONS,
      trim: true,
    },
    shirtNumber: {
      type: Number,
      required: [true, 'Shirt number is required'],
      min: 1,
      max: 99,
    },
    age: {
      type: Number,
      default: 0,
      min: 0,
      max: 60,
    },
    caps: {
      type: Number,
      default: 0,
      min: 0,
    },
    goals: {
      type: Number,
      default: 0,
      min: 0,
    },
    assists: {
      type: Number,
      default: 0,
      min: 0,
    },
    preferredFoot: {
      type: String,
      enum: ['Left', 'Right', 'Both'],
      default: 'Right',
    },
    image: {
      type: String,
      default: '',
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* Indexes */
playerSchema.index({ nation: 1, shirtNumber: 1 }, { unique: true });
playerSchema.index({ position: 1 });
playerSchema.index({ name: 'text', club: 'text' });

const Player = mongoose.model('Player', playerSchema);
export default Player;
