import Stadium from '../models/Stadium.js';
import ApiFeatures from '../utils/apiFeatures.js';

/**
 * @route   GET /api/stadiums
 * @desc    Get all stadiums with optional filtering
 */
export async function getStadiums(req, res, next) {
  try {
    const features = new ApiFeatures(Stadium.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const [stadiums, total] = await Promise.all([
      features.query,
      features.countTotal(),
    ]);

    res.json({
      success: true,
      pagination: features.getPaginationMeta(total),
      data: stadiums,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/stadiums/:id
 * @desc    Get single stadium by ID
 */
export async function getStadiumById(req, res, next) {
  try {
    const stadium = await Stadium.findById(req.params.id);
    if (!stadium) {
      res.status(404);
      throw new Error('Stadium not found');
    }
    res.json({ success: true, data: stadium });
  } catch (error) {
    next(error);
  }
}
