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

// The 8 slots in the RO32 designated for 3rd-placed teams and their allowed groups
const THIRD_PLACE_SLOTS = [
  { slot: 'R32-3', vs: '1E', allowed: ['A', 'B', 'C', 'D', 'F'] },
  { slot: 'R32-6', vs: '1I', allowed: ['C', 'D', 'F', 'G', 'H'] },
  { slot: 'R32-10', vs: '1D', allowed: ['B', 'E', 'F', 'I', 'J'] },
  { slot: 'R32-9', vs: '1G', allowed: ['A', 'E', 'H', 'I', 'J'] },
  { slot: 'R32-7', vs: '1A', allowed: ['C', 'E', 'F', 'H', 'I'] },
  { slot: 'R32-8', vs: '1L', allowed: ['E', 'H', 'I', 'J', 'K'] },
  { slot: 'R32-13', vs: '1B', allowed: ['E', 'F', 'G', 'I', 'J'] },
  { slot: 'R32-16', vs: '1K', allowed: ['D', 'E', 'I', 'J', 'L'] }
];

function assignThirdPlacedTeamsBackend(qualifiedGroups) {
  if (qualifiedGroups.length !== 8) {
    return {};
  }
  const groups = [...qualifiedGroups].sort();
  const groupsStr = groups.join(',');
  if (groupsStr === 'B,D,E,F,I,J,K,L') {
    return {
      'R32-3': 'D',
      'R32-6': 'F',
      'R32-10': 'B',
      'R32-7': 'E',
      'R32-9': 'I',
      'R32-13': 'J',
      'R32-8': 'K',
      'R32-16': 'L'
    };
  }
  const assignment = {};
  
  const solve = (slotIndex, availableGroups) => {
    if (slotIndex === THIRD_PLACE_SLOTS.length) {
      return true;
    }
    const currentSlot = THIRD_PLACE_SLOTS[slotIndex];
    for (let i = 0; i < availableGroups.length; i++) {
      const group = availableGroups[i];
      if (currentSlot.allowed.includes(group)) {
        assignment[currentSlot.slot] = group;
        const remainingGroups = [...availableGroups];
        remainingGroups.splice(i, 1);
        if (solve(slotIndex + 1, remainingGroups)) {
          return true;
        }
        delete assignment[currentSlot.slot];
      }
    }
    return false;
  };

  const success = solve(0, groups);
  if (!success) {
    THIRD_PLACE_SLOTS.forEach((slot, i) => {
      assignment[slot.slot] = groups[i];
    });
  }
  return assignment;
}

const roundOf32Slots = [
  { matchNumber: 73, slot: 'R32-1',  homeRef: '2A', awayRef: '2B' },
  { matchNumber: 74, slot: 'R32-2',  homeRef: '1C', awayRef: '2F' },
  { matchNumber: 75, slot: 'R32-3',  homeRef: '1E', awayRef: '3rdPlace' },
  { matchNumber: 76, slot: 'R32-4',  homeRef: '1F', awayRef: '2C' },
  { matchNumber: 77, slot: 'R32-5',  homeRef: '2E', awayRef: '2I' },
  { matchNumber: 78, slot: 'R32-6',  homeRef: '1I', awayRef: '3rdPlace' },
  { matchNumber: 79, slot: 'R32-7',  homeRef: '1A', awayRef: '3rdPlace' },
  { matchNumber: 80, slot: 'R32-8',  homeRef: '1L', awayRef: '3rdPlace' },
  { matchNumber: 81, slot: 'R32-9',  homeRef: '1G', awayRef: '3rdPlace' },
  { matchNumber: 82, slot: 'R32-10', homeRef: '1D', awayRef: '3rdPlace' },
  { matchNumber: 83, slot: 'R32-11', homeRef: '1H', awayRef: '2J' },
  { matchNumber: 84, slot: 'R32-12', homeRef: '2K', awayRef: '2L' },
  { matchNumber: 85, slot: 'R32-13', homeRef: '1B', awayRef: '3rdPlace' },
  { matchNumber: 86, slot: 'R32-14', homeRef: '2D', awayRef: '2G' },
  { matchNumber: 87, slot: 'R32-15', homeRef: '1J', awayRef: '2H' },
  { matchNumber: 88, slot: 'R32-16', homeRef: '1K', awayRef: '3rdPlace' }
];

export async function syncOfficialBracket() {
  try {
    const nations = await Nation.find({});
    const fixtures = await Fixture.find({});

    const grouped = {};
    const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    groupLetters.forEach(letter => {
      grouped[letter] = [];
    });
    nations.forEach(nation => {
      if (nation.group && grouped[nation.group]) {
        grouped[nation.group].push(nation);
      }
    });

    const getH2HWinner = (teamA, teamB) => {
      const match = fixtures.find(f => 
        f.round === 'Group Stage' &&
        f.status === 'Completed' &&
        ((f.homeTeam?.toString() === teamA._id.toString() && f.awayTeam?.toString() === teamB._id.toString()) ||
         (f.homeTeam?.toString() === teamB._id.toString() && f.awayTeam?.toString() === teamA._id.toString()))
      );
      if (!match) return null;
      if (!match.winner) return 'draw';
      return match.winner.toString();
    };

    groupLetters.forEach(letter => {
      grouped[letter].sort((a, b) => {
        if ((b.points || 0) !== (a.points || 0)) {
          return (b.points || 0) - (a.points || 0);
        }
        const h2hWinner = getH2HWinner(a, b);
        if (h2hWinner && h2hWinner !== 'draw') {
          return h2hWinner === a._id.toString() ? -1 : 1;
        }
        if ((b.goalDifference || 0) !== (a.goalDifference || 0)) {
          return (b.goalDifference || 0) - (a.goalDifference || 0);
        }
        if ((b.goalsFor || 0) !== (a.goalsFor || 0)) {
          return (b.goalsFor || 0) - (a.goalsFor || 0);
        }
        if ((b.goalsAgainst || 0) !== (a.goalsAgainst || 0)) {
          return (a.goalsAgainst || 0) - (b.goalsAgainst || 0);
        }
        return (a.fifaRank || 999) - (b.fifaRank || 999);
      });
    });

    const selectedThirdPlacedGroups = [];
    groupLetters.forEach(letter => {
      const team3 = grouped[letter][2];
      if (team3 && team3.status === 'Qualified') {
        selectedThirdPlacedGroups.push(letter);
      }
    });

    let thirdPlaceMapping = {};
    if (selectedThirdPlacedGroups.length === 8) {
      thirdPlaceMapping = assignThirdPlacedTeamsBackend(selectedThirdPlacedGroups);
    }

    const resolveTeam = (ref, slot) => {
      if (ref === '3rdPlace') {
        const assignedGroup = thirdPlaceMapping[slot];
        if (!assignedGroup) return null;
        return grouped[assignedGroup][2] || null;
      }
      const rank = parseInt(ref.charAt(0), 10);
      const groupLetter = ref.charAt(1);
      return grouped[groupLetter][rank - 1] || null;
    };

    // Update Round of 32
    for (const slotObj of roundOf32Slots) {
      const resolvedHome = resolveTeam(slotObj.homeRef, slotObj.slot);
      const resolvedAway = resolveTeam(slotObj.awayRef, slotObj.slot);

      const dbFixture = fixtures.find(f => f.matchNumber === slotObj.matchNumber);
      if (dbFixture) {
        let isChanged = false;
        const homeId = resolvedHome ? resolvedHome._id.toString() : null;
        const awayId = resolvedAway ? resolvedAway._id.toString() : null;

        if (dbFixture.homeTeam?.toString() !== homeId) {
          dbFixture.homeTeam = resolvedHome ? resolvedHome._id : null;
          isChanged = true;
        }
        if (dbFixture.awayTeam?.toString() !== awayId) {
          dbFixture.awayTeam = resolvedAway ? resolvedAway._id : null;
          isChanged = true;
        }
        if (isChanged) {
          await dbFixture.save();
        }
      }
    }

    // Cascade top-down
    const allFixtures = await Fixture.find({}).sort('matchNumber');
    for (const f of allFixtures) {
      if (f.matchNumber >= 73) {
        const winnerId = f.winner;
        let loserId = null;

        if (winnerId && f.status === 'Completed') {
          const homeIdStr = f.homeTeam?.toString();
          const awayIdStr = f.awayTeam?.toString();
          if (winnerId.toString() === homeIdStr) {
            loserId = f.awayTeam;
          } else if (winnerId.toString() === awayIdStr) {
            loserId = f.homeTeam;
          }
        }

        const searchPatternWinner = new RegExp(`Winner Match[- ]${f.matchNumber}`, 'i');
        const searchPatternLoser = new RegExp(`Loser Match[- ]${f.matchNumber}`, 'i');

        const nextMatches = allFixtures.filter(nextF => 
          (nextF.homeTeamPlaceholder && (nextF.homeTeamPlaceholder.match(searchPatternWinner) || nextF.homeTeamPlaceholder.match(searchPatternLoser))) ||
          (nextF.awayTeamPlaceholder && (nextF.awayTeamPlaceholder.match(searchPatternWinner) || nextF.awayTeamPlaceholder.match(searchPatternLoser)))
        );

        for (const nextM of nextMatches) {
          let nextChanged = false;

          if (nextM.homeTeamPlaceholder && nextM.homeTeamPlaceholder.match(searchPatternWinner)) {
            const expectedHome = (f.status === 'Completed' && winnerId) ? winnerId : null;
            if (nextM.homeTeam?.toString() !== (expectedHome ? expectedHome.toString() : null)) {
              nextM.homeTeam = expectedHome;
              nextChanged = true;
            }
          }
          if (nextM.homeTeamPlaceholder && nextM.homeTeamPlaceholder.match(searchPatternLoser)) {
            const expectedHome = (f.status === 'Completed' && loserId) ? loserId : null;
            if (nextM.homeTeam?.toString() !== (expectedHome ? expectedHome.toString() : null)) {
              nextM.homeTeam = expectedHome;
              nextChanged = true;
            }
          }

          if (nextM.awayTeamPlaceholder && nextM.awayTeamPlaceholder.match(searchPatternWinner)) {
            const expectedAway = (f.status === 'Completed' && winnerId) ? winnerId : null;
            if (nextM.awayTeam?.toString() !== (expectedAway ? expectedAway.toString() : null)) {
              nextM.awayTeam = expectedAway;
              nextChanged = true;
            }
          }
          if (nextM.awayTeamPlaceholder && nextM.awayTeamPlaceholder.match(searchPatternLoser)) {
            const expectedAway = (f.status === 'Completed' && loserId) ? loserId : null;
            if (nextM.awayTeam?.toString() !== (expectedAway ? expectedAway.toString() : null)) {
              nextM.awayTeam = expectedAway;
              nextChanged = true;
            }
          }

          if (nextChanged) {
            if (nextM.status !== 'Scheduled') {
              nextM.status = 'Scheduled';
              nextM.score = { home: 0, away: 0, penalties: { home: null, away: null } };
              nextM.winner = null;
            }
            await nextM.save();
          }
        }
      }
    }
  } catch (err) {
    console.error("Error in syncOfficialBracket:", err);
  }
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

    // 2. Bracket synchronization for all Knockout matches
    await syncOfficialBracket();

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
