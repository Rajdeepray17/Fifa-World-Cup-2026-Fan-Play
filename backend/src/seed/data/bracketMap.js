/**
 * Bracket Map — Official FIFA World Cup 2026 knockout progression.
 *
 * With 48 teams in 12 groups, the top 2 from each group (24 teams)
 * plus the 8 best third-placed teams (32 total) advance to a
 * single-elimination knockout bracket.
 *
 * This map encodes:
 * 1. R32 slot assignments based on group finishing positions
 * 2. R16 matchups from R32 winners
 * 3. QF/SF/Final progression
 */

export const bracketMap = {
  /* ── Round of 32 ── (16 matches → 16 winners advance to R16) */
  roundOf32: [
    { slot: 'R32-1',  home: '1E', away: '3A/B/C/D/F' },
    { slot: 'R32-2',  home: '1I', away: '3C/D/F/G/H' },
    { slot: 'R32-3',  home: '2A', away: '2B' },
    { slot: 'R32-4',  home: '1F', away: '2C' },
    { slot: 'R32-5',  home: '2K', away: '2L' },
    { slot: 'R32-6',  home: '1H', away: '2J' },
    { slot: 'R32-7',  home: '1D', away: '3B/E/F/I/J' },
    { slot: 'R32-8',  home: '1G', away: '3A/E/H/I/J' },
    { slot: 'R32-9',  home: '1C', away: '2F' },
    { slot: 'R32-10', home: '2E', away: '2I' },
    { slot: 'R32-11', home: '1A', away: '3C/E/F/H/I' },
    { slot: 'R32-12', home: '1L', away: '3E/H/I/J/K' },
    { slot: 'R32-13', home: '1J', away: '2H' },
    { slot: 'R32-14', home: '2D', away: '2G' },
    { slot: 'R32-15', home: '1B', away: '3E/F/G/I/J' },
    { slot: 'R32-16', home: '1K', away: '3D/E/I/J/L' },
  ],

  /* ── Round of 16 ── (8 matches → 8 winners advance to QF) */
  roundOf16: [
    { slot: 'R16-1', home: 'W(R32-1)',  away: 'W(R32-2)' },
    { slot: 'R16-2', home: 'W(R32-3)',  away: 'W(R32-4)' },
    { slot: 'R16-3', home: 'W(R32-5)',  away: 'W(R32-6)' },
    { slot: 'R16-4', home: 'W(R32-7)',  away: 'W(R32-8)' },
    { slot: 'R16-5', home: 'W(R32-9)',  away: 'W(R32-10)' },
    { slot: 'R16-6', home: 'W(R32-11)', away: 'W(R32-12)' },
    { slot: 'R16-7', home: 'W(R32-13)', away: 'W(R32-14)' },
    { slot: 'R16-8', home: 'W(R32-15)', away: 'W(R32-16)' },
  ],

  /* ── Quarter Finals ── (4 matches → 4 winners advance to SF) */
  quarterFinals: [
    { slot: 'QF-1', home: 'W(R16-1)', away: 'W(R16-2)' },
    { slot: 'QF-2', home: 'W(R16-3)', away: 'W(R16-4)' },
    { slot: 'QF-3', home: 'W(R16-5)', away: 'W(R16-6)' },
    { slot: 'QF-4', home: 'W(R16-7)', away: 'W(R16-8)' },
  ],

  /* ── Semi Finals ── */
  semiFinals: [
    { slot: 'SF-1', home: 'W(QF-1)', away: 'W(QF-2)' },
    { slot: 'SF-2', home: 'W(QF-3)', away: 'W(QF-4)' },
  ],

  /* ── Third Place Match ── */
  thirdPlace: {
    slot: '3RD', home: 'L(SF-1)', away: 'L(SF-2)',
  },

  /* ── Final ── */
  final: {
    slot: 'FINAL', home: 'W(SF-1)', away: 'W(SF-2)',
  },
};

/**
 * 8 best third-place scenarios.
 * FIFA determines which 8 third-place teams qualify based on points/GD/GF.
 * The specific group combinations determine R32 slot assignments.
 * This lookup table maps possible third-place qualifying group
 * combinations to their R32 pairings.
 */
export const thirdPlaceScenarios = [
  /* Each entry: which groups the 8 third-place qualifiers come from */
  { groups: ['A','B','C','D','E','F','G','H'], note: 'Scenario 1' },
  { groups: ['A','B','C','D','E','F','G','I'], note: 'Scenario 2' },
  { groups: ['A','B','C','D','E','F','H','I'], note: 'Scenario 3' },
  /* Additional scenarios would be populated when FIFA publishes the full mapping */
];
