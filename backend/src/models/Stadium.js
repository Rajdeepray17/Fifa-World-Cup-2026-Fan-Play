import mongoose from 'mongoose';

/**
 * Stadium — Host venue for FIFA World Cup 2026.
 * 16 stadiums across USA (11), Mexico (3), Canada (2).
 */
const stadiumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Stadium name is required'],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      enum: ['United States', 'Canada', 'Mexico'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: 0,
    },
    image: {
      type: String,
      default: '',
    },
    coordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* Indexes */
stadiumSchema.index({ name: 1 });
stadiumSchema.index({ country: 1 });

const Stadium = mongoose.model('Stadium', stadiumSchema);
export default Stadium;
