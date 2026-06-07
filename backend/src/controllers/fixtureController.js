import Fixture from '../models/Fixture.js';
import ApiFeatures from '../utils/apiFeatures.js';

const POPULATE_TEAMS = [
  { path: 'homeTeam', select: 'name code flagCode' },
  { path: 'awayTeam', select: 'name code flagCode' },
  { path: 'stadium', select: 'name city country capacity' },
  { path: 'winner', select: 'name code flagCode' },
];

/**
 * @route   GET /api/fixtures
 * @desc    Get all fixtures with filtering, sorting, pagination
 */
export async function getFixtures(req, res, next) {
  try {
    const features = new ApiFeatures(Fixture.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    features.query = features.query.populate(POPULATE_TEAMS);

    const [fixtures, total] = await Promise.all([
      features.query,
      features.countTotal(),
    ]);

    res.json({
      success: true,
      pagination: features.getPaginationMeta(total),
      data: fixtures,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/fixtures/:id
 * @desc    Get single fixture by ID
 */
export async function getFixtureById(req, res, next) {
  try {
    const fixture = await Fixture.findById(req.params.id).populate(POPULATE_TEAMS);
    if (!fixture) {
      res.status(404);
      throw new Error('Fixture not found');
    }
    res.json({ success: true, data: fixture });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/fixtures/group/:group
 * @desc    Get all fixtures for a specific group (A–L)
 */
export async function getFixturesByGroup(req, res, next) {
  try {
    const fixtures = await Fixture.find({ group: req.params.group })
      .populate(POPULATE_TEAMS)
      .sort('date');

    res.json({
      success: true,
      group: req.params.group,
      count: fixtures.length,
      data: fixtures,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/fixtures/round/:round
 * @desc    Get all fixtures for a specific round
 */
export async function getFixturesByRound(req, res, next) {
  try {
    const fixtures = await Fixture.find({ round: req.params.round })
      .populate(POPULATE_TEAMS)
      .sort('date');

    res.json({
      success: true,
      round: req.params.round,
      count: fixtures.length,
      data: fixtures,
    });
  } catch (error) {
    next(error);
  }
}
