import mongoose from 'mongoose';

/**
 * Nation — One of the 48 qualified FIFA World Cup 2026 nations.
 * Stores identity, ranking, group assignment, and theme colors
 * that integrate with the Phase 1 client-side Theme Engine.
 */
const nationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nation name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'ISO code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: 10,
    },
    flagCode: {
      type: String,
      required: [true, 'Flag code is required'],
      lowercase: true,
      trim: true,
    },
    fifaRank: {
      type: Number,
      default: 0,
      min: 0,
    },
    confederation: {
      type: String,
      required: [true, 'Confederation is required'],
      enum: ['AFC', 'CAF', 'CONCACAF', 'CONMEBOL', 'OFC', 'UEFA'],
      trim: true,
    },
    manager: {
      type: String,
      default: 'TBD',
      trim: true,
    },
    group: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', null],
      default: null,
    },
    historicalBest: {
      type: String,
      default: 'N/A',
      trim: true,
    },
    theme: {
      primary: { type: String, required: true, default: '#c4a44a' },
      secondary: { type: String, required: true, default: '#e8d48b' },
      accent: { type: String, required: true, default: '#8b6914' },
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
    played: {
      type: Number,
      default: 0,
      min: 0,
    },
    wins: {
      type: Number,
      default: 0,
      min: 0,
    },
    draws: {
      type: Number,
      default: 0,
      min: 0,
    },
    losses: {
      type: Number,
      default: 0,
      min: 0,
    },
    goalsFor: {
      type: Number,
      default: 0,
      min: 0,
    },
    goalsAgainst: {
      type: Number,
      default: 0,
      min: 0,
    },
    goalDifference: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Qualified', 'Eliminated'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* Virtual: players belonging to this nation */
nationSchema.virtual('players', {
  ref: 'Player',
  localField: '_id',
  foreignField: 'nation',
  justOne: false,
});

/* Indexes */
nationSchema.index({ code: 1 }, { unique: true });
nationSchema.index({ group: 1 });
nationSchema.index({ confederation: 1 });
nationSchema.index({ fifaRank: 1 });

const Nation = mongoose.model('Nation', nationSchema);
export default Nation;
