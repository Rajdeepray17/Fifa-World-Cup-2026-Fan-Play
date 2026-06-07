import { assignThirdPlacedTeams } from './knockoutMapping.js';

/**
 * Bracket Generator
 * Takes user predictions for group stages and third-placed qualifiers and generates the Round of 32 bracket.
 */

// Helper to find the team ID/object based on group rank
const getTeamByRank = (groupsData, groupLetter, rank) => {
  const groupTeams = groupsData[groupLetter];
  if (!groupTeams || groupTeams.length < rank) return null;
  // Assume groupsData is { A: [1st, 2nd, 3rd, 4th], B: [...] }
  return groupTeams[rank - 1]; 
};

/**
 * Generates the Round of 32 bracket matchups.
 * @param {Object} groupsData - Record mapping group letter to array of team objects ordered by user rank.
 *                              Example: { A: [{name: 'Mexico'}, ...], B: [...] }
 * @param {Array<string>} selectedThirdPlacedGroups - Array of 8 group letters representing the advancing 3rd-placed teams.
 * @returns {Array<Object>} Array of 16 match objects with resolved home and away teams.
 */
export const generateBracket = (groupsData, selectedThirdPlacedGroups) => {
  // 1. Resolve deterministic 3rd place assignments mapping slot -> groupLetter
  const thirdPlaceMapping = assignThirdPlacedTeams(selectedThirdPlacedGroups);

  // 2. Base mapping for RO32 matches
  const roundOf32Slots = [
    { id: 'R32-0',  homeRef: '1E', awayRef: '3rdPlace' }, // vs 3A/B/C/D/F
    { id: 'R32-1',  homeRef: '1I', awayRef: '3rdPlace' }, // vs 3C/D/F/G/H
    { id: 'R32-2',  homeRef: '2A', awayRef: '2B' },
    { id: 'R32-3',  homeRef: '1F', awayRef: '2C' },
    { id: 'R32-4',  homeRef: '2K', awayRef: '2L' },
    { id: 'R32-5',  homeRef: '1H', awayRef: '2J' },
    { id: 'R32-6',  homeRef: '1D', awayRef: '3rdPlace' }, // vs 3B/E/F/I/J
    { id: 'R32-7',  homeRef: '1G', awayRef: '3rdPlace' }, // vs 3A/E/H/I/J
    { id: 'R32-8',  homeRef: '1C', awayRef: '2F' },
    { id: 'R32-9', homeRef: '2E', awayRef: '2I' },
    { id: 'R32-10', homeRef: '1A', awayRef: '3rdPlace' }, // vs 3C/E/F/H/I
    { id: 'R32-11', homeRef: '1L', awayRef: '3rdPlace' }, // vs 3E/H/I/J/K
    { id: 'R32-12', homeRef: '1J', awayRef: '2H' },
    { id: 'R32-13', homeRef: '2D', awayRef: '2G' },
    { id: 'R32-14', homeRef: '1B', awayRef: '3rdPlace' }, // vs 3E/F/G/I/J
    { id: 'R32-15', homeRef: '1K', awayRef: '3rdPlace' }  // vs 3D/E/I/J/L
  ];

  // Helper to parse reference like "1A" or "2B" to the actual team object
  const resolveTeam = (ref, slotId) => {
    if (ref === '3rdPlace') {
      const assignedGroup = thirdPlaceMapping[slotId];
      return getTeamByRank(groupsData, assignedGroup, 3);
    }
    const rank = parseInt(ref.charAt(0));
    const groupLetter = ref.charAt(1);
    return getTeamByRank(groupsData, groupLetter, rank);
  };

  // 3. Populate matches
  const matches = roundOf32Slots.map(match => {
    return {
      id: match.id,
      homeTeam: resolveTeam(match.homeRef, match.id),
      awayTeam: resolveTeam(match.awayRef, match.id),
      winner: null // To be filled as user predicts knockout stages
    };
  });

  return matches;
};
