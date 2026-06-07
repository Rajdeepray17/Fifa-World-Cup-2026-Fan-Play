/**
 * FIFA World Cup 2026 Fixtures — 104 matches.
 * 72 group stage + 16 R32 + 8 R16 + 4 QF + 2 SF + 1 Third Place + 1 Final.
 *
 * Group stage fixtures reference nation codes (resolved to ObjectIds at seed time).
 * Knockout fixtures use placeholders.
 *
 * Dates are approximate based on the Jun 11 – Jul 19 2026 schedule.
 * Stadium assignments use stadium names (resolved to ObjectIds at seed time).
 */

export const fixturesData = [
  /* ═══════════════════════════════════════════════════════════════
     GROUP STAGE — 72 matches (Matchday 1: Jun 11–16, MD2: Jun 17–22, MD3: Jun 23–28)
     ═══════════════════════════════════════════════════════════════ */

  /* ── Group A ── */
  { matchNumber: 1,  home: 'MEX', away: 'RSA', date: '2026-06-11T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Estadio Azteca',    group: 'A', round: 'Group Stage', bracketPosition: 'GS-A1' },
  { matchNumber: 2,  home: 'KOR', away: 'CZE', date: '2026-06-11T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'AT&T Stadium',       group: 'A', round: 'Group Stage', bracketPosition: 'GS-A2' },
  { matchNumber: 3,  home: 'MEX', away: 'KOR', date: '2026-06-17T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'NRG Stadium',         group: 'A', round: 'Group Stage', bracketPosition: 'GS-A3' },
  { matchNumber: 4,  home: 'RSA', away: 'CZE', date: '2026-06-17T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Lumen Field',         group: 'A', round: 'Group Stage', bracketPosition: 'GS-A4' },
  { matchNumber: 5,  home: 'MEX', away: 'CZE', date: '2026-06-23T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Estadio Azteca',      group: 'A', round: 'Group Stage', bracketPosition: 'GS-A5' },
  { matchNumber: 6,  home: 'KOR', away: 'RSA', date: '2026-06-23T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Estadio Akron',       group: 'A', round: 'Group Stage', bracketPosition: 'GS-A6' },

  /* ── Group B ── */
  { matchNumber: 7,  home: 'CAN', away: 'ITA', date: '2026-06-12T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'BMO Field',            group: 'B', round: 'Group Stage', bracketPosition: 'GS-B1' },
  { matchNumber: 8,  home: 'QAT', away: 'SUI', date: '2026-06-12T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Hard Rock Stadium',    group: 'B', round: 'Group Stage', bracketPosition: 'GS-B2' },
  { matchNumber: 9,  home: 'CAN', away: 'QAT', date: '2026-06-18T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'BC Place',             group: 'B', round: 'Group Stage', bracketPosition: 'GS-B3' },
  { matchNumber: 10, home: 'ITA', away: 'SUI', date: '2026-06-18T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'MetLife Stadium',      group: 'B', round: 'Group Stage', bracketPosition: 'GS-B4' },
  { matchNumber: 11, home: 'CAN', away: 'SUI', date: '2026-06-24T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'BMO Field',            group: 'B', round: 'Group Stage', bracketPosition: 'GS-B5' },
  { matchNumber: 12, home: 'ITA', away: 'QAT', date: '2026-06-24T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'MetLife Stadium',      group: 'B', round: 'Group Stage', bracketPosition: 'GS-B6' },

  /* ── Group C ── */
  { matchNumber: 13, home: 'BRA', away: 'MAR', date: '2026-06-12T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'AT&T Stadium',         group: 'C', round: 'Group Stage', bracketPosition: 'GS-C1' },
  { matchNumber: 14, home: 'HAI', away: 'SCO', date: '2026-06-13T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Gillette Stadium',     group: 'C', round: 'Group Stage', bracketPosition: 'GS-C2' },
  { matchNumber: 15, home: 'BRA', away: 'HAI', date: '2026-06-19T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'SoFi Stadium',          group: 'C', round: 'Group Stage', bracketPosition: 'GS-C3' },
  { matchNumber: 16, home: 'MAR', away: 'SCO', date: '2026-06-19T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Lincoln Financial Field', group: 'C', round: 'Group Stage', bracketPosition: 'GS-C4' },
  { matchNumber: 17, home: 'BRA', away: 'SCO', date: '2026-06-25T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'NRG Stadium',           group: 'C', round: 'Group Stage', bracketPosition: 'GS-C5' },
  { matchNumber: 18, home: 'MAR', away: 'HAI', date: '2026-06-25T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Gillette Stadium',      group: 'C', round: 'Group Stage', bracketPosition: 'GS-C6' },

  /* ── Group D ── */
  { matchNumber: 19, home: 'USA', away: 'PAR', date: '2026-06-13T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'MetLife Stadium',       group: 'D', round: 'Group Stage', bracketPosition: 'GS-D1' },
  { matchNumber: 20, home: 'AUS', away: 'TUR', date: '2026-06-13T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'SoFi Stadium',          group: 'D', round: 'Group Stage', bracketPosition: 'GS-D2' },
  { matchNumber: 21, home: 'USA', away: 'AUS', date: '2026-06-19T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Hard Rock Stadium',     group: 'D', round: 'Group Stage', bracketPosition: 'GS-D3' },
  { matchNumber: 22, home: 'PAR', away: 'TUR', date: '2026-06-19T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'GEHA Field at Arrowhead Stadium', group: 'D', round: 'Group Stage', bracketPosition: 'GS-D4' },
  { matchNumber: 23, home: 'USA', away: 'TUR', date: '2026-06-25T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'MetLife Stadium',       group: 'D', round: 'Group Stage', bracketPosition: 'GS-D5' },
  { matchNumber: 24, home: 'AUS', away: 'PAR', date: '2026-06-25T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Lumen Field',            group: 'D', round: 'Group Stage', bracketPosition: 'GS-D6' },

  /* ── Group E ── */
  { matchNumber: 25, home: 'GER', away: 'CUW', date: '2026-06-14T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Mercedes-Benz Stadium', group: 'E', round: 'Group Stage', bracketPosition: 'GS-E1' },
  { matchNumber: 26, home: 'CIV', away: 'ECU', date: '2026-06-14T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Levi\'s Stadium',       group: 'E', round: 'Group Stage', bracketPosition: 'GS-E2' },
  { matchNumber: 27, home: 'GER', away: 'CIV', date: '2026-06-20T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'AT&T Stadium',           group: 'E', round: 'Group Stage', bracketPosition: 'GS-E3' },
  { matchNumber: 28, home: 'CUW', away: 'ECU', date: '2026-06-20T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Hard Rock Stadium',      group: 'E', round: 'Group Stage', bracketPosition: 'GS-E4' },
  { matchNumber: 29, home: 'GER', away: 'ECU', date: '2026-06-26T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Mercedes-Benz Stadium',  group: 'E', round: 'Group Stage', bracketPosition: 'GS-E5' },
  { matchNumber: 30, home: 'CIV', away: 'CUW', date: '2026-06-26T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Levi\'s Stadium',        group: 'E', round: 'Group Stage', bracketPosition: 'GS-E6' },

  /* ── Group F ── */
  { matchNumber: 31, home: 'NED', away: 'JPN', date: '2026-06-14T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Lincoln Financial Field', group: 'F', round: 'Group Stage', bracketPosition: 'GS-F1' },
  { matchNumber: 32, home: 'SWE', away: 'TUN', date: '2026-06-15T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'GEHA Field at Arrowhead Stadium', group: 'F', round: 'Group Stage', bracketPosition: 'GS-F2' },
  { matchNumber: 33, home: 'NED', away: 'SWE', date: '2026-06-20T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'SoFi Stadium',            group: 'F', round: 'Group Stage', bracketPosition: 'GS-F3' },
  { matchNumber: 34, home: 'JPN', away: 'TUN', date: '2026-06-20T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Estadio BBVA',             group: 'F', round: 'Group Stage', bracketPosition: 'GS-F4' },
  { matchNumber: 35, home: 'NED', away: 'TUN', date: '2026-06-26T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Lincoln Financial Field',  group: 'F', round: 'Group Stage', bracketPosition: 'GS-F5' },
  { matchNumber: 36, home: 'JPN', away: 'SWE', date: '2026-06-26T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Estadio BBVA',             group: 'F', round: 'Group Stage', bracketPosition: 'GS-F6' },

  /* ── Group G ── */
  { matchNumber: 37, home: 'BEL', away: 'EGY', date: '2026-06-15T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Gillette Stadium',      group: 'G', round: 'Group Stage', bracketPosition: 'GS-G1' },
  { matchNumber: 38, home: 'IRN', away: 'NZL', date: '2026-06-15T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Estadio Akron',          group: 'G', round: 'Group Stage', bracketPosition: 'GS-G2' },
  { matchNumber: 39, home: 'BEL', away: 'IRN', date: '2026-06-21T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Mercedes-Benz Stadium',  group: 'G', round: 'Group Stage', bracketPosition: 'GS-G3' },
  { matchNumber: 40, home: 'EGY', away: 'NZL', date: '2026-06-21T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Lumen Field',            group: 'G', round: 'Group Stage', bracketPosition: 'GS-G4' },
  { matchNumber: 41, home: 'BEL', away: 'NZL', date: '2026-06-27T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Gillette Stadium',       group: 'G', round: 'Group Stage', bracketPosition: 'GS-G5' },
  { matchNumber: 42, home: 'EGY', away: 'IRN', date: '2026-06-27T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Estadio Akron',           group: 'G', round: 'Group Stage', bracketPosition: 'GS-G6' },

  /* ── Group H ── */
  { matchNumber: 43, home: 'ESP', away: 'CPV', date: '2026-06-16T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'NRG Stadium',            group: 'H', round: 'Group Stage', bracketPosition: 'GS-H1' },
  { matchNumber: 44, home: 'KSA', away: 'URU', date: '2026-06-16T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Estadio BBVA',           group: 'H', round: 'Group Stage', bracketPosition: 'GS-H2' },
  { matchNumber: 45, home: 'ESP', away: 'KSA', date: '2026-06-22T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'AT&T Stadium',            group: 'H', round: 'Group Stage', bracketPosition: 'GS-H3' },
  { matchNumber: 46, home: 'CPV', away: 'URU', date: '2026-06-22T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'GEHA Field at Arrowhead Stadium', group: 'H', round: 'Group Stage', bracketPosition: 'GS-H4' },
  { matchNumber: 47, home: 'ESP', away: 'URU', date: '2026-06-28T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'NRG Stadium',             group: 'H', round: 'Group Stage', bracketPosition: 'GS-H5' },
  { matchNumber: 48, home: 'CPV', away: 'KSA', date: '2026-06-28T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Estadio Azteca',          group: 'H', round: 'Group Stage', bracketPosition: 'GS-H6' },

  /* ── Group I ── */
  { matchNumber: 49, home: 'FRA', away: 'SEN', date: '2026-06-16T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'SoFi Stadium',            group: 'I', round: 'Group Stage', bracketPosition: 'GS-I1' },
  { matchNumber: 50, home: 'TBD-IC2', away: 'NOR', date: '2026-06-16T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'BC Place',            group: 'I', round: 'Group Stage', bracketPosition: 'GS-I2' },
  { matchNumber: 51, home: 'FRA', away: 'TBD-IC2', date: '2026-06-22T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Hard Rock Stadium',   group: 'I', round: 'Group Stage', bracketPosition: 'GS-I3' },
  { matchNumber: 52, home: 'SEN', away: 'NOR', date: '2026-06-22T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Levi\'s Stadium',          group: 'I', round: 'Group Stage', bracketPosition: 'GS-I4' },
  { matchNumber: 53, home: 'FRA', away: 'NOR', date: '2026-06-28T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'SoFi Stadium',             group: 'I', round: 'Group Stage', bracketPosition: 'GS-I5' },
  { matchNumber: 54, home: 'SEN', away: 'TBD-IC2', date: '2026-06-28T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'BC Place',             group: 'I', round: 'Group Stage', bracketPosition: 'GS-I6' },

  /* ── Group J ── */
  { matchNumber: 55, home: 'ARG', away: 'ALG', date: '2026-06-11T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Hard Rock Stadium',      group: 'J', round: 'Group Stage', bracketPosition: 'GS-J1' },
  { matchNumber: 56, home: 'AUT', away: 'JOR', date: '2026-06-11T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Mercedes-Benz Stadium',  group: 'J', round: 'Group Stage', bracketPosition: 'GS-J2' },
  { matchNumber: 57, home: 'ARG', away: 'AUT', date: '2026-06-17T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'SoFi Stadium',            group: 'J', round: 'Group Stage', bracketPosition: 'GS-J3' },
  { matchNumber: 58, home: 'ALG', away: 'JOR', date: '2026-06-17T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Levi\'s Stadium',          group: 'J', round: 'Group Stage', bracketPosition: 'GS-J4' },
  { matchNumber: 59, home: 'ARG', away: 'JOR', date: '2026-06-23T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Hard Rock Stadium',       group: 'J', round: 'Group Stage', bracketPosition: 'GS-J5' },
  { matchNumber: 60, home: 'ALG', away: 'AUT', date: '2026-06-23T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Mercedes-Benz Stadium',   group: 'J', round: 'Group Stage', bracketPosition: 'GS-J6' },

  /* ── Group K ── */
  { matchNumber: 61, home: 'POR', away: 'TBD-IC1', date: '2026-06-12T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Lincoln Financial Field', group: 'K', round: 'Group Stage', bracketPosition: 'GS-K1' },
  { matchNumber: 62, home: 'UZB', away: 'COL', date: '2026-06-12T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Estadio BBVA',            group: 'K', round: 'Group Stage', bracketPosition: 'GS-K2' },
  { matchNumber: 63, home: 'POR', away: 'UZB', date: '2026-06-18T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'AT&T Stadium',             group: 'K', round: 'Group Stage', bracketPosition: 'GS-K3' },
  { matchNumber: 64, home: 'TBD-IC1', away: 'COL', date: '2026-06-18T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Estadio Azteca',      group: 'K', round: 'Group Stage', bracketPosition: 'GS-K4' },
  { matchNumber: 65, home: 'POR', away: 'COL', date: '2026-06-24T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Lincoln Financial Field',  group: 'K', round: 'Group Stage', bracketPosition: 'GS-K5' },
  { matchNumber: 66, home: 'UZB', away: 'TBD-IC1', date: '2026-06-24T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Estadio Akron',        group: 'K', round: 'Group Stage', bracketPosition: 'GS-K6' },

  /* ── Group L ── */
  { matchNumber: 67, home: 'ENG', away: 'CRO', date: '2026-06-15T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'MetLife Stadium',        group: 'L', round: 'Group Stage', bracketPosition: 'GS-L1' },
  { matchNumber: 68, home: 'GHA', away: 'PAN', date: '2026-06-15T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'BMO Field',              group: 'L', round: 'Group Stage', bracketPosition: 'GS-L2' },
  { matchNumber: 69, home: 'ENG', away: 'GHA', date: '2026-06-21T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'NRG Stadium',             group: 'L', round: 'Group Stage', bracketPosition: 'GS-L3' },
  { matchNumber: 70, home: 'CRO', away: 'PAN', date: '2026-06-21T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Estadio Azteca',          group: 'L', round: 'Group Stage', bracketPosition: 'GS-L4' },
  { matchNumber: 71, home: 'ENG', away: 'PAN', date: '2026-06-27T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'MetLife Stadium',         group: 'L', round: 'Group Stage', bracketPosition: 'GS-L5' },
  { matchNumber: 72, home: 'CRO', away: 'GHA', date: '2026-06-27T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'BMO Field',               group: 'L', round: 'Group Stage', bracketPosition: 'GS-L6' },

  /* ═══════════════════════════════════════════════════════════════
     KNOCKOUT STAGE — 32 matches (Jun 30 – Jul 19)
     ═══════════════════════════════════════════════════════════════ */

  /* ── Round of 32 ── (16 matches: Jun 30 – Jul 3) */
  { matchNumber: 73,  homePlaceholder: '1E', awayPlaceholder: '3A/B/C/D/F', date: '2026-06-30T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'AT&T Stadium',           group: null, round: 'Round of 32', bracketPosition: 'R32-1' },
  { matchNumber: 74,  homePlaceholder: '1I', awayPlaceholder: '3C/D/F/G/H',     date: '2026-06-30T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'MetLife Stadium',         group: null, round: 'Round of 32', bracketPosition: 'R32-2' },
  { matchNumber: 75,  homePlaceholder: '2A', awayPlaceholder: '2B', date: '2026-07-01T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'SoFi Stadium',            group: null, round: 'Round of 32', bracketPosition: 'R32-3' },
  { matchNumber: 76,  homePlaceholder: '1F', awayPlaceholder: '2C',     date: '2026-07-01T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Hard Rock Stadium',       group: null, round: 'Round of 32', bracketPosition: 'R32-4' },
  { matchNumber: 77,  homePlaceholder: '2K', awayPlaceholder: '2L', date: '2026-07-01T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Mercedes-Benz Stadium',   group: null, round: 'Round of 32', bracketPosition: 'R32-5' },
  { matchNumber: 78,  homePlaceholder: '1H', awayPlaceholder: '2J',     date: '2026-07-02T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'NRG Stadium',             group: null, round: 'Round of 32', bracketPosition: 'R32-6' },
  { matchNumber: 79,  homePlaceholder: '1D', awayPlaceholder: '3B/E/F/I/J', date: '2026-07-02T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Lincoln Financial Field', group: null, round: 'Round of 32', bracketPosition: 'R32-7' },
  { matchNumber: 80,  homePlaceholder: '1G', awayPlaceholder: '3A/E/H/I/J',     date: '2026-07-02T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Lumen Field',             group: null, round: 'Round of 32', bracketPosition: 'R32-8' },
  { matchNumber: 81,  homePlaceholder: '1C', awayPlaceholder: '2F', date: '2026-06-30T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Gillette Stadium',        group: null, round: 'Round of 32', bracketPosition: 'R32-9' },
  { matchNumber: 82,  homePlaceholder: '2E', awayPlaceholder: '2I', date: '2026-07-01T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Levi\'s Stadium',         group: null, round: 'Round of 32', bracketPosition: 'R32-10' },
  { matchNumber: 83,  homePlaceholder: '1A', awayPlaceholder: '3C/E/F/H/I',     date: '2026-07-02T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'BC Place',                group: null, round: 'Round of 32', bracketPosition: 'R32-11' },
  { matchNumber: 84,  homePlaceholder: '1L', awayPlaceholder: '3E/H/I/J/K', date: '2026-07-03T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'GEHA Field at Arrowhead Stadium', group: null, round: 'Round of 32', bracketPosition: 'R32-12' },
  { matchNumber: 85,  homePlaceholder: '1J', awayPlaceholder: '2H', date: '2026-07-03T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Estadio Azteca',          group: null, round: 'Round of 32', bracketPosition: 'R32-13' },
  { matchNumber: 86,  homePlaceholder: '2D', awayPlaceholder: '2G',     date: '2026-07-03T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'BMO Field',               group: null, round: 'Round of 32', bracketPosition: 'R32-14' },
  { matchNumber: 87,  homePlaceholder: '1B', awayPlaceholder: '3E/F/G/I/J', date: '2026-07-03T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Estadio BBVA',            group: null, round: 'Round of 32', bracketPosition: 'R32-15' },
  { matchNumber: 88,  homePlaceholder: '1K', awayPlaceholder: '3D/E/I/J/L', date: '2026-07-03T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Estadio Akron',           group: null, round: 'Round of 32', bracketPosition: 'R32-16' },

  /* ── Round of 16 ── (8 matches: Jul 5–6) */
  { matchNumber: 89,  homePlaceholder: 'W(R32-1)',  awayPlaceholder: 'W(R32-2)',  date: '2026-07-05T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'AT&T Stadium',           group: null, round: 'Round of 16', bracketPosition: 'R16-1' },
  { matchNumber: 90,  homePlaceholder: 'W(R32-3)',  awayPlaceholder: 'W(R32-4)',  date: '2026-07-05T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'SoFi Stadium',            group: null, round: 'Round of 16', bracketPosition: 'R16-2' },
  { matchNumber: 91,  homePlaceholder: 'W(R32-5)',  awayPlaceholder: 'W(R32-6)',  date: '2026-07-06T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'Mercedes-Benz Stadium',   group: null, round: 'Round of 16', bracketPosition: 'R16-3' },
  { matchNumber: 92,  homePlaceholder: 'W(R32-7)',  awayPlaceholder: 'W(R32-8)',  date: '2026-07-06T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Hard Rock Stadium',       group: null, round: 'Round of 16', bracketPosition: 'R16-4' },
  { matchNumber: 93,  homePlaceholder: 'W(R32-9)',  awayPlaceholder: 'W(R32-10)', date: '2026-07-06T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'MetLife Stadium',         group: null, round: 'Round of 16', bracketPosition: 'R16-5' },
  { matchNumber: 94,  homePlaceholder: 'W(R32-11)', awayPlaceholder: 'W(R32-12)', date: '2026-07-07T15:00:00Z', kickoffIST: '20:30 IST', stadium: 'NRG Stadium',             group: null, round: 'Round of 16', bracketPosition: 'R16-6' },
  { matchNumber: 95,  homePlaceholder: 'W(R32-13)', awayPlaceholder: 'W(R32-14)', date: '2026-07-07T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Lincoln Financial Field', group: null, round: 'Round of 16', bracketPosition: 'R16-7' },
  { matchNumber: 96,  homePlaceholder: 'W(R32-15)', awayPlaceholder: 'W(R32-16)', date: '2026-07-07T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'Levi\'s Stadium',         group: null, round: 'Round of 16', bracketPosition: 'R16-8' },

  /* ── Quarter Finals ── (4 matches: Jul 10–11) */
  { matchNumber: 97,  homePlaceholder: 'W(R16-1)', awayPlaceholder: 'W(R16-2)', date: '2026-07-10T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'AT&T Stadium',           group: null, round: 'Quarter Final', bracketPosition: 'QF-1' },
  { matchNumber: 98,  homePlaceholder: 'W(R16-3)', awayPlaceholder: 'W(R16-4)', date: '2026-07-10T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'SoFi Stadium',            group: null, round: 'Quarter Final', bracketPosition: 'QF-2' },
  { matchNumber: 99,  homePlaceholder: 'W(R16-5)', awayPlaceholder: 'W(R16-6)', date: '2026-07-11T18:00:00Z', kickoffIST: '23:30 IST', stadium: 'Hard Rock Stadium',       group: null, round: 'Quarter Final', bracketPosition: 'QF-3' },
  { matchNumber: 100, homePlaceholder: 'W(R16-7)', awayPlaceholder: 'W(R16-8)', date: '2026-07-11T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'MetLife Stadium',         group: null, round: 'Quarter Final', bracketPosition: 'QF-4' },

  /* ── Semi Finals ── (2 matches: Jul 14–15) */
  { matchNumber: 101, homePlaceholder: 'W(QF-1)', awayPlaceholder: 'W(QF-2)', date: '2026-07-14T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'AT&T Stadium',   group: null, round: 'Semi Final', bracketPosition: 'SF-1' },
  { matchNumber: 102, homePlaceholder: 'W(QF-3)', awayPlaceholder: 'W(QF-4)', date: '2026-07-15T21:00:00Z', kickoffIST: '02:30 IST', stadium: 'MetLife Stadium', group: null, round: 'Semi Final', bracketPosition: 'SF-2' },

  /* ── Third Place ── */
  { matchNumber: 103, homePlaceholder: 'L(SF-1)', awayPlaceholder: 'L(SF-2)', date: '2026-07-18T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'Hard Rock Stadium', group: null, round: 'Third Place', bracketPosition: '3RD' },

  /* ── Final ── */
  { matchNumber: 104, homePlaceholder: 'W(SF-1)', awayPlaceholder: 'W(SF-2)', date: '2026-07-19T20:00:00Z', kickoffIST: '01:30 IST', stadium: 'MetLife Stadium', group: null, round: 'Final', bracketPosition: 'FINAL' },
];
