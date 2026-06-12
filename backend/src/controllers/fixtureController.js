import Fixture from '../models/Fixture.js';
import Nation from '../models/Nation.js';
import ApiFeatures from '../utils/apiFeatures.js';

const POPULATE_TEAMS = [
  { path: 'homeTeam', select: 'name code flagCode theme' },
  { path: 'awayTeam', select: 'name code flagCode theme' },
  { path: 'stadium', select: 'name city country capacity' },
  { path: 'winner', select: 'name code flagCode theme' },
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

/**
 * Helper: Recalculates and updates group standings for all nations in a specific group.
 * @param {string} groupLetter - Group A to L
 */
async function updateGroupStandings(groupLetter) {
  // 1. Get all nations in this group
  const nations = await Nation.find({ group: groupLetter });
  
  // 2. Map nations by ID to initialize stats
  const statsMap = {};
  for (const nation of nations) {
    statsMap[nation._id.toString()] = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0
    };
  }

  // 3. Get all completed fixtures in this group
  const completedFixtures = await Fixture.find({ 
    group: groupLetter, 
    status: 'Completed' 
  });

  // 4. Calculate stats from completed fixtures
  for (const fixture of completedFixtures) {
    const homeId = fixture.homeTeam?.toString();
    const awayId = fixture.awayTeam?.toString();

    // Skip if home/away team objects are not resolved yet (e.g. placeholders)
    if (!homeId || !awayId || !statsMap[homeId] || !statsMap[awayId]) {
      continue;
    }

    const homeScore = fixture.score.home;
    const awayScore = fixture.score.away;

    // Played
    statsMap[homeId].played += 1;
    statsMap[awayId].played += 1;

    // Goals For / Against
    statsMap[homeId].goalsFor += homeScore;
    statsMap[homeId].goalsAgainst += awayScore;
    statsMap[awayId].goalsFor += awayScore;
    statsMap[awayId].goalsAgainst += homeScore;

    // Wins / Losses / Draws & Points
    if (homeScore > awayScore) {
      statsMap[homeId].wins += 1;
      statsMap[homeId].points += 3;
      statsMap[awayId].losses += 1;
    } else if (homeScore < awayScore) {
      statsMap[awayId].wins += 1;
      statsMap[awayId].points += 3;
      statsMap[homeId].losses += 1;
    } else {
      statsMap[homeId].draws += 1;
      statsMap[homeId].points += 1;
      statsMap[awayId].draws += 1;
      statsMap[awayId].points += 1;
    }
  }

  // 5. Update each nation in the database
  const updatePromises = nations.map(nation => {
    const idStr = nation._id.toString();
    const stats = statsMap[idStr];
    
    nation.played = stats.played;
    nation.wins = stats.wins;
    nation.draws = stats.draws;
    nation.losses = stats.losses;
    nation.goalsFor = stats.goalsFor;
    nation.goalsAgainst = stats.goalsAgainst;
    nation.goalDifference = stats.goalsFor - stats.goalsAgainst;
    nation.points = stats.points;

    return nation.save();
  });

  await Promise.all(updatePromises);
}

/**
 * @route   PUT /api/fixtures/:id/score
 * @desc    Update match score, status, and handle standings/bracket propagation
 */
export async function updateFixtureScore(req, res, next) {
  try {
    const adminPin = req.headers['x-admin-pin'];
    if (adminPin !== 'BRAZIL0407') {
      res.status(401);
      throw new Error('Unauthorized: Invalid Admin PIN');
    }

    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) {
      res.status(404);
      throw new Error('Fixture not found');
    }

    const { score, status } = req.body;

    if (score !== undefined) {
      if (score.home !== undefined) fixture.score.home = Number(score.home);
      if (score.away !== undefined) fixture.score.away = Number(score.away);
      if (score.penalties !== undefined) {
        fixture.score.penalties = {
          home: score.penalties.home !== null ? Number(score.penalties.home) : null,
          away: score.penalties.away !== null ? Number(score.penalties.away) : null,
        };
      }
    }

    if (status !== undefined) {
      fixture.status = status;
    }

    // Determine winner based on score / penalties
    if (fixture.status === 'Completed') {
      const homeScore = fixture.score.home;
      const awayScore = fixture.score.away;
      const homePenalties = fixture.score.penalties?.home;
      const awayPenalties = fixture.score.penalties?.away;

      if (homeScore > awayScore) {
        fixture.winner = fixture.homeTeam;
      } else if (homeScore < awayScore) {
        fixture.winner = fixture.awayTeam;
      } else {
        // If draw, check penalties
        if (homePenalties !== undefined && homePenalties !== null && awayPenalties !== undefined && awayPenalties !== null) {
          if (homePenalties > awayPenalties) {
            fixture.winner = fixture.homeTeam;
          } else if (homePenalties < awayPenalties) {
            fixture.winner = fixture.awayTeam;
          } else {
            fixture.winner = null;
          }
        } else {
          fixture.winner = null; // Group Stage draw
        }
      }
    } else {
      fixture.winner = null;
    }

    await fixture.save();

    // 1. Recalculate Group Standings if this is a Group Stage match
    if (fixture.round === 'Group Stage' && fixture.group) {
      await updateGroupStandings(fixture.group);
    }

    // 2. Bracket propagation for Knockout matches
    if (fixture.status === 'Completed') {
      const winnerId = fixture.winner;
      let loserId = null;

      if (winnerId) {
        // For knockout matches, there must be a winner. Determine loser
        const homeIdStr = fixture.homeTeam?.toString();
        const awayIdStr = fixture.awayTeam?.toString();
        
        if (winnerId.toString() === homeIdStr) {
          loserId = fixture.awayTeam;
        } else if (winnerId.toString() === awayIdStr) {
          loserId = fixture.homeTeam;
        }
      }

      if (winnerId) {
        const searchPattern = new RegExp(`Winner Match[- ]${fixture.matchNumber}`, 'i');
        
        await Fixture.updateMany(
          { homeTeamPlaceholder: searchPattern },
          { homeTeam: winnerId }
        );
        await Fixture.updateMany(
          { awayTeamPlaceholder: searchPattern },
          { awayTeam: winnerId }
        );
      }

      if (loserId) {
        const searchPattern = new RegExp(`Loser Match[- ]${fixture.matchNumber}`, 'i');
        
        await Fixture.updateMany(
          { homeTeamPlaceholder: searchPattern },
          { homeTeam: loserId }
        );
        await Fixture.updateMany(
          { awayTeamPlaceholder: searchPattern },
          { awayTeam: loserId }
        );
      }
    }

    // Fetch the updated, fully populated fixture to return
    const updatedFixture = await Fixture.findById(fixture._id).populate(POPULATE_TEAMS);

    res.json({
      success: true,
      message: 'Fixture updated successfully',
      data: updatedFixture,
    });
  } catch (error) {
    next(error);
  }
}
