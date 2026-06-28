import Nation from '../models/Nation.js';
import ApiFeatures from '../utils/apiFeatures.js';
import { syncOfficialBracket } from './fixtureController.js';

/**
 * @route   GET /api/nations
 * @desc    Get all nations with filtering, sorting, pagination
 */
export async function getNations(req, res, next) {
  try {
    const features = new ApiFeatures(Nation.find(), req.query)
      .filter()
      .search(['name'])
      .sort()
      .limitFields()
      .paginate();

    const [nations, total] = await Promise.all([
      features.query,
      features.countTotal(),
    ]);

    res.json({
      success: true,
      pagination: features.getPaginationMeta(total),
      data: nations,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/nations/:id
 * @desc    Get single nation by ObjectId
 */
export async function getNationById(req, res, next) {
  try {
    const nation = await Nation.findById(req.params.id);
    if (!nation) {
      res.status(404);
      throw new Error('Nation not found');
    }
    res.json({ success: true, data: nation });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/nations/code/:code
 * @desc    Get single nation by ISO code (e.g., "BR", "AR")
 */
export async function getNationByCode(req, res, next) {
  try {
    const code = req.params.code.toUpperCase();
    const nation = await Nation.findOne({ code });
    if (!nation) {
      res.status(404);
      throw new Error(`Nation with code "${code}" not found`);
    }
    res.json({ success: true, data: nation });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   PUT /api/nations/:id/status
 * @desc    Update nation qualification/elimination status (Admin only)
 */
export async function updateNationStatus(req, res, next) {
  try {
    const adminPin = req.headers['x-admin-pin'];
    if (adminPin !== 'BRAZIL0407') {
      res.status(401);
      throw new Error('Unauthorized: Invalid Admin PIN');
    }

    const nation = await Nation.findById(req.params.id);
    if (!nation) {
      res.status(404);
      throw new Error('Nation not found');
    }

    const { status } = req.body;
    if (!status || !['Active', 'Qualified', 'Eliminated'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status value. Must be Active, Qualified, or Eliminated');
    }

    nation.status = status;
    await nation.save();

    // Trigger bracket sync
    await syncOfficialBracket();

    res.json({
      success: true,
      message: 'Nation status updated successfully',
      data: nation,
    });
  } catch (error) {
    next(error);
  }
}
