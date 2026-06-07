import mongoose from 'mongoose';

/**
 * Fixture — A single match in the FIFA World Cup 2026.
 * Supports all 104 matches: 72 group stage + 32 knockout.
 * Knockout matches use placeholder strings until teams are determined.
 */

const ROUNDS = [
  'Group Stage',
  'Round of 32',
  'Round of 16',
  'Quarter Final',
  'Semi Final',
  'Third Place',
  'Final',
];

const MATCH_STATUSES = ['Scheduled', 'Live', 'Completed'];

const fixtureSchema = new mongoose.Schema(
  {
    matchNumber: {
      type: Number,
      required: [true, 'Match number is required'],
      unique: true,
      min: 1,
      max: 104,
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nation',
      default: null,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nation',
      default: null,
    },
    /* Placeholder labels for knockout matches where teams are TBD */
    homeTeamPlaceholder: {
      type: String,
      default: '',
      trim: true,
    },
    awayTeamPlaceholder: {
      type: String,
      default: '',
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Match date is required'],
    },
    kickoffIST: {
      type: String,
      default: '',
      trim: true,
    },
    stadium: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stadium',
      default: null,
    },
    group: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', null],
      default: null,
    },
    round: {
      type: String,
      required: [true, 'Round is required'],
      enum: ROUNDS,
      trim: true,
    },
    status: {
      type: String,
      enum: MATCH_STATUSES,
      default: 'Scheduled',
    },
    score: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 },
      penalties: {
        home: { type: Number, default: null },
        away: { type: Number, default: null },
      },
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nation',
      default: null,
    },
    /* Bracket engine fields */
    bracketPosition: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* Indexes */
fixtureSchema.index({ matchNumber: 1 }, { unique: true });
fixtureSchema.index({ round: 1 });
fixtureSchema.index({ group: 1 });
fixtureSchema.index({ date: 1 });
fixtureSchema.index({ homeTeam: 1, awayTeam: 1 });
fixtureSchema.index({ bracketPosition: 1 });

const Fixture = mongoose.model('Fixture', fixtureSchema);
export default Fixture;
