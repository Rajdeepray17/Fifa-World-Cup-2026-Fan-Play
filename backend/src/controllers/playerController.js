import Player from '../models/Player.js';
import ApiFeatures from '../utils/apiFeatures.js';

/**
 * @route   GET /api/players
 * @desc    Get all players with filtering, search, pagination
 */
export async function getPlayers(req, res, next) {
  try {
    const features = new ApiFeatures(Player.find(), req.query)
      .filter()
      .search(['name', 'club'])
      .sort()
      .limitFields()
      .paginate();

    /* Populate nation name and code for each player */
    features.query = features.query.populate('nation', 'name code flagCode');

    const [players, total] = await Promise.all([
      features.query,
      features.countTotal(),
    ]);

    res.json({
      success: true,
      pagination: features.getPaginationMeta(total),
      data: players,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/players/:id
 * @desc    Get single player by ID
 */
export async function getPlayerById(req, res, next) {
  try {
    const player = await Player.findById(req.params.id).populate(
      'nation',
      'name code flagCode theme'
    );
    if (!player) {
      res.status(404);
      throw new Error('Player not found');
    }
    res.json({ success: true, data: player });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/players/nation/:nationId
 * @desc    Get all players for a specific nation (full 26-man squad) by ObjectId
 */
export async function getPlayersByNation(req, res, next) {
  try {
    const players = await Player.find({ nation: req.params.nationId })
      .populate('nation', 'name code flagCode')
      .sort('shirtNumber');

    res.json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   GET /api/players/nation/code/:code
 * @desc    Get all players for a specific nation by its 3-letter code (e.g. ARG, BRA)
 */
export async function getPlayersByNationCode(req, res, next) {
  try {
    const code = req.params.code.toUpperCase();
    
    // First, find the nation by code to get its ObjectId
    // We have to import Nation model to do this or we can do an aggregation/populate match
    // An aggregation or deep populate is better. But since we need the nation _id, let's just do a 2-step lookup for simplicity.
    const mongoose = (await import('mongoose')).default;
    const Nation = mongoose.model('Nation');
    
    const nation = await Nation.findOne({ code });
    if (!nation) {
      res.status(404);
      throw new Error(`Nation with code "${code}" not found`);
    }

    const players = await Player.find({ nation: nation._id })
      .populate('nation', 'name code flagCode')
      .sort('shirtNumber');

    res.json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route   POST /api/players/bulk
 * @desc    Bulk insert players (for data import)
 */
export async function bulkInsertPlayers(req, res, next) {
  try {
    const { players } = req.body;
    if (!Array.isArray(players) || players.length === 0) {
      res.status(400);
      throw new Error('Request body must contain a non-empty "players" array');
    }

    const inserted = await Player.insertMany(players, { ordered: false });
    res.status(201).json({
      success: true,
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    next(error);
  }
}
