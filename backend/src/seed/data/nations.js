/**
 * 48 Qualified Nations for FIFA World Cup 2026.
 * Theme colors mirror client/src/data/nations.js for Theme Engine compatibility.
 * Group assignments based on the official December 2025 draw.
 *
 * Note: Some playoff slots are marked as placeholders (isPlaceholder: true).
 * These will be updated when the qualifiers are resolved.
 */

export const nationsData = [
  /* ── GROUP A ── */
  { name: 'Mexico',          code: 'MEX', flagCode: 'mx', fifaRank: 15, confederation: 'CONCACAF', manager: 'Javier Aguirre',   group: 'A', historicalBest: 'Quarter Finals (1970, 1986)', theme: { primary: '#006847', secondary: '#FFFFFF', accent: '#CE1126' } },
  { name: 'South Africa',    code: 'RSA', flagCode: 'za', fifaRank: 59, confederation: 'CAF',      manager: 'Hugo Broos',       group: 'A', historicalBest: 'Group Stage (1998, 2002, 2010)', theme: { primary: '#007A4D', secondary: '#FFB612', accent: '#3A3A3A' } },
  { name: 'South Korea',     code: 'KOR', flagCode: 'kr', fifaRank: 22, confederation: 'AFC',      manager: 'Hong Myung-bo',    group: 'A', historicalBest: 'Fourth Place (2002)', theme: { primary: '#C8102E', secondary: '#0047A0', accent: '#FFFFFF' } },
  { name: 'Czechia',         code: 'CZE', flagCode: 'cz', fifaRank: 36, confederation: 'UEFA',     manager: 'Ivan Hašek',       group: 'A', historicalBest: 'Runner-Up (1934, 1962 as Czechoslovakia)', theme: { primary: '#11457E', secondary: '#D7141A', accent: '#FFFFFF' } },

  /* ── GROUP B ── */
  { name: 'Canada',          code: 'CAN', flagCode: 'ca', fifaRank: 42, confederation: 'CONCACAF', manager: 'Jesse Marsch',     group: 'B', historicalBest: 'Group Stage (1986, 2022)', theme: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#C60C30' } },
  { name: 'Bosnia',          code: 'BIH', flagCode: 'ba', fifaRank: 74, confederation: 'UEFA',     manager: 'Savo Milošević',   group: 'B', historicalBest: 'Group Stage (2014)', theme: { primary: '#002395', secondary: '#FFFFFF', accent: '#FECB00' } },
  { name: 'Qatar',           code: 'QAT', flagCode: 'qa', fifaRank: 45, confederation: 'AFC',      manager: 'Carlos Queiroz',   group: 'B', historicalBest: 'Group Stage (2022)', theme: { primary: '#8A1538', secondary: '#FFFFFF', accent: '#7A1428' } },
  { name: 'Switzerland',     code: 'SUI', flagCode: 'ch', fifaRank: 16, confederation: 'UEFA',     manager: 'Murat Yakin',      group: 'B', historicalBest: 'Quarter Finals (1934, 1938, 1954)', theme: { primary: '#DA291C', secondary: '#FFFFFF', accent: '#A6192E' } },

  /* ── GROUP C ── */
  { name: 'Brazil',          code: 'BRA', flagCode: 'br', fifaRank: 5,  confederation: 'CONMEBOL', manager: 'Dorival Júnior',   group: 'C', historicalBest: 'Winner (1958, 1962, 1970, 1994, 2002)', theme: { primary: '#009C3B', secondary: '#FFDF00', accent: '#002776' } },
  { name: 'Morocco',         code: 'MAR', flagCode: 'ma', fifaRank: 14, confederation: 'CAF',      manager: 'Walid Regragui',   group: 'C', historicalBest: 'Semi Finals (2022)', theme: { primary: '#C1272D', secondary: '#006233', accent: '#FFD700' } },
  { name: 'Haiti',           code: 'HAI', flagCode: 'ht', fifaRank: 81, confederation: 'CONCACAF', manager: 'Marc Collat',      group: 'C', historicalBest: 'Group Stage (1974)', theme: { primary: '#00209F', secondary: '#D21034', accent: '#FFD700' } },
  { name: 'Scotland',        code: 'SCO', flagCode: 'gb-sct', fifaRank: 39, confederation: 'UEFA', manager: 'Steve Clarke',     group: 'C', historicalBest: 'Group Stage (1954, 1958, 1974, 1978, 1982, 1986, 1990, 1998)', theme: { primary: '#005EB8', secondary: '#FFFFFF', accent: '#002B49' } },

  /* ── GROUP D ── */
  { name: 'USA',             code: 'USA', flagCode: 'us', fifaRank: 11, confederation: 'CONCACAF', manager: 'Mauricio Pochettino', group: 'D', historicalBest: 'Semi Finals (1930)', theme: { primary: '#0A3161', secondary: '#FFFFFF', accent: '#B22234' } },
  { name: 'Paraguay',        code: 'PAR', flagCode: 'py', fifaRank: 53, confederation: 'CONMEBOL', manager: 'Alfaro Moreno',    group: 'D', historicalBest: 'Quarter Finals (2010)', theme: { primary: '#D52B1E', secondary: '#0038A8', accent: '#FFFFFF' } },
  { name: 'Australia',       code: 'AUS', flagCode: 'au', fifaRank: 24, confederation: 'AFC',      manager: 'Tony Popovic',     group: 'D', historicalBest: 'Round of 16 (2022)', theme: { primary: '#0A1C2A', secondary: '#FFCD00', accent: '#00843D' } },
  { name: 'Turkey',          code: 'TUR', flagCode: 'tr', fifaRank: 26, confederation: 'UEFA',     manager: 'Vincenzo Montella', group: 'D', historicalBest: 'Third Place (2002)', theme: { primary: '#E30A17', secondary: '#FFFFFF', accent: '#9E1B32' } },

  /* ── GROUP E ── */
  { name: 'Germany',         code: 'GER', flagCode: 'de', fifaRank: 8,  confederation: 'UEFA',     manager: 'Julian Nagelsmann', group: 'E', historicalBest: 'Winner (1954, 1974, 1990, 2014)', theme: { primary: '#000000', secondary: '#DD0000', accent: '#FFCC00' } },
  { name: 'Curacao',         code: 'CUW', flagCode: 'cw', fifaRank: 85, confederation: 'CONCACAF', manager: 'Dick Advocaat',    group: 'E', historicalBest: 'Debut (2026)', theme: { primary: '#002B7F', secondary: '#F9E814', accent: '#FFFFFF' } },
  { name: 'Ivory Coast',     code: 'CIV', flagCode: 'ci', fifaRank: 38, confederation: 'CAF',      manager: 'Emerse Faé',       group: 'E', historicalBest: 'Group Stage (2006, 2010, 2014)', theme: { primary: '#FF8200', secondary: '#FFFFFF', accent: '#009E60' } },
  { name: 'Ecuador',         code: 'ECU', flagCode: 'ec', fifaRank: 30, confederation: 'CONMEBOL', manager: 'Sebastián Beccacece', group: 'E', historicalBest: 'Round of 16 (2006)', theme: { primary: '#FFDD00', secondary: '#001489', accent: '#ED1C24' } },

  /* ── GROUP F ── */
  { name: 'Netherlands',     code: 'NED', flagCode: 'nl', fifaRank: 3,  confederation: 'UEFA',     manager: 'Ronald Koeman',    group: 'F', historicalBest: 'Runner-Up (1974, 1978, 2010)', theme: { primary: '#F36C21', secondary: '#FFFFFF', accent: '#21468B' } },
  { name: 'Japan',           code: 'JPN', flagCode: 'jp', fifaRank: 18, confederation: 'AFC',      manager: 'Hajime Moriyasu',  group: 'F', historicalBest: 'Round of 16 (2002, 2010, 2018, 2022)', theme: { primary: '#002060', secondary: '#FFFFFF', accent: '#E2041B' } },
  { name: 'Sweden',          code: 'SWE', flagCode: 'se', fifaRank: 20, confederation: 'UEFA',     manager: 'Jon Dahl Tomasson', group: 'F', historicalBest: 'Runner-Up (1958)', theme: { primary: '#006AA7', secondary: '#FECC02', accent: '#004B75' } },
  { name: 'Tunisia',         code: 'TUN', flagCode: 'tn', fifaRank: 40, confederation: 'CAF',      manager: 'Faouzi Benzarti',  group: 'F', historicalBest: 'Group Stage (1978, 1998, 2002, 2006, 2018, 2022)', theme: { primary: '#E70013', secondary: '#FFFFFF', accent: '#C4000C' } },

  /* ── GROUP G ── */
  { name: 'Belgium',         code: 'BEL', flagCode: 'be', fifaRank: 6,  confederation: 'UEFA',     manager: 'Domenico Tedesco', group: 'G', historicalBest: 'Third Place (2018)', theme: { primary: '#E30613', secondary: '#FFD900', accent: '#000000' } },
  { name: 'Egypt',           code: 'EGY', flagCode: 'eg', fifaRank: 34, confederation: 'CAF',      manager: 'Hossam Hassan',    group: 'G', historicalBest: 'Group Stage (1934, 1990, 2018)', theme: { primary: '#C09300', secondary: '#E31B23', accent: '#000000' } },
  { name: 'Iran',            code: 'IRN', flagCode: 'ir', fifaRank: 21, confederation: 'AFC',      manager: 'Amir Ghalenoei',   group: 'G', historicalBest: 'Group Stage (1978, 1998, 2006, 2014, 2018, 2022)', theme: { primary: '#239F40', secondary: '#FFFFFF', accent: '#DA251D' } },
  { name: 'New Zealand',     code: 'NZL', flagCode: 'nz', fifaRank: 95, confederation: 'OFC',      manager: 'Darren Bazeley',   group: 'G', historicalBest: 'Group Stage (1982, 2010)', theme: { primary: '#000000', secondary: '#FFFFFF', accent: '#7F7F7F' } },

  /* ── GROUP H ── */
  { name: 'Spain',           code: 'ESP', flagCode: 'es', fifaRank: 1,  confederation: 'UEFA',     manager: 'Luis de la Fuente', group: 'H', historicalBest: 'Winner (2010)', theme: { primary: '#C60B1E', secondary: '#FFC400', accent: '#AA151B' } },
  { name: 'Cape Verde',      code: 'CPV', flagCode: 'cv', fifaRank: 68, confederation: 'CAF',      manager: 'Pedro Brito',      group: 'H', historicalBest: 'Debut (2026)', theme: { primary: '#002A65', secondary: '#FFD100', accent: '#E30A17' } },
  { name: 'Saudi Arabia',    code: 'KSA', flagCode: 'sa', fifaRank: 57, confederation: 'AFC',      manager: 'Roberto Mancini',  group: 'H', historicalBest: 'Round of 16 (1994)', theme: { primary: '#006C35', secondary: '#FFFFFF', accent: '#004F26' } },
  { name: 'Uruguay',         code: 'URU', flagCode: 'uy', fifaRank: 10, confederation: 'CONMEBOL', manager: 'Marcelo Bielsa',   group: 'H', historicalBest: 'Winner (1930, 1950)', theme: { primary: '#55B3FF', secondary: '#FFFFFF', accent: '#FCD116' } },

  /* ── GROUP I ── */
  { name: 'France',          code: 'FRA', flagCode: 'fr', fifaRank: 2,  confederation: 'UEFA',     manager: 'Didier Deschamps', group: 'I', historicalBest: 'Winner (1998, 2018)', theme: { primary: '#002395', secondary: '#FFFFFF', accent: '#ED2939' } },
  { name: 'Senegal',         code: 'SEN', flagCode: 'sn', fifaRank: 19, confederation: 'CAF',      manager: 'Pape Thiaw',       group: 'I', historicalBest: 'Quarter Finals (2002)', theme: { primary: '#00853F', secondary: '#FDEF42', accent: '#E31B23' } },
  { name: 'Iraq',            code: 'IRQ', flagCode: 'iq', fifaRank: 58, confederation: 'AFC',      manager: 'Jesús Casas',      group: 'I', historicalBest: 'Group Stage (1986)', theme: { primary: '#007A3D', secondary: '#FFFFFF', accent: '#000000' } },
  { name: 'Norway',          code: 'NOR', flagCode: 'no', fifaRank: 25, confederation: 'UEFA',     manager: 'Ståle Solbakken',  group: 'I', historicalBest: 'Group Stage (1938, 1994, 1998)', theme: { primary: '#BA0C2F', secondary: '#00205B', accent: '#FFFFFF' } },

  /* ── GROUP J ── */
  { name: 'Argentina',       code: 'ARG', flagCode: 'ar', fifaRank: 7,  confederation: 'CONMEBOL', manager: 'Lionel Scaloni',   group: 'J', historicalBest: 'Winner (1978, 1986, 2022)', theme: { primary: '#75AADB', secondary: '#FFFFFF', accent: '#F6B40E' } },
  { name: 'Algeria',         code: 'ALG', flagCode: 'dz', fifaRank: 33, confederation: 'CAF',      manager: 'Vladimir Petković', group: 'J', historicalBest: 'Round of 16 (2014)', theme: { primary: '#006633', secondary: '#FFFFFF', accent: '#D52B1E' } },
  { name: 'Austria',         code: 'AUT', flagCode: 'at', fifaRank: 23, confederation: 'UEFA',     manager: 'Ralf Rangnick',    group: 'J', historicalBest: 'Third Place (1954)', theme: { primary: '#C8102E', secondary: '#FFFFFF', accent: '#9E1B32' } },
  { name: 'Jordan',          code: 'JOR', flagCode: 'jo', fifaRank: 67, confederation: 'AFC',      manager: 'Hussein Ammouta',  group: 'J', historicalBest: 'Debut (2026)', theme: { primary: '#007A3E', secondary: '#000000', accent: '#CE1126' } },

  /* ── GROUP K ── */
  { name: 'Portugal',        code: 'POR', flagCode: 'pt', fifaRank: 9,  confederation: 'UEFA',     manager: 'Roberto Martínez', group: 'K', historicalBest: 'Third Place (1966)', theme: { primary: '#DA291C', secondary: '#006600', accent: '#FFE600' } },
  { name: 'DR Congo',        code: 'COD', flagCode: 'cd', fifaRank: 63, confederation: 'CAF',      manager: 'Sébastien Desabre', group: 'K', historicalBest: 'Group Stage (1974)', theme: { primary: '#007FFF', secondary: '#F7D116', accent: '#CE1126' } },
  { name: 'Uzbekistan',      code: 'UZB', flagCode: 'uz', fifaRank: 62, confederation: 'AFC',      manager: 'Srecko Katanec',   group: 'K', historicalBest: 'Debut (2026)', theme: { primary: '#0099B8', secondary: '#FFFFFF', accent: '#33B333' } },
  { name: 'Colombia',        code: 'COL', flagCode: 'co', fifaRank: 12, confederation: 'CONMEBOL', manager: 'Néstor Lorenzo',   group: 'K', historicalBest: 'Quarter Finals (2014)', theme: { primary: '#FCD116', secondary: '#003893', accent: '#CE1126' } },

  /* ── GROUP L ── */
  { name: 'England',         code: 'ENG', flagCode: 'gb-eng', fifaRank: 13, confederation: 'UEFA', manager: 'Thomas Tuchel',    group: 'L', historicalBest: 'Winner (1966)', theme: { primary: '#CF081F', secondary: '#FFFFFF', accent: '#1C2C5B' } },
  { name: 'Croatia',         code: 'CRO', flagCode: 'hr', fifaRank: 17, confederation: 'UEFA',     manager: 'Zlatko Dalić',     group: 'L', historicalBest: 'Runner-Up (2018)', theme: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#002F6C' } },
  { name: 'Ghana',           code: 'GHA', flagCode: 'gh', fifaRank: 66, confederation: 'CAF',      manager: 'Otto Addo',        group: 'L', historicalBest: 'Quarter Finals (2010)', theme: { primary: '#E30A17', secondary: '#FFD100', accent: '#006B3F' } },
  { name: 'Panama',          code: 'PAN', flagCode: 'pa', fifaRank: 48, confederation: 'CONCACAF', manager: 'Thomas Christiansen', group: 'L', historicalBest: 'Group Stage (2018)', theme: { primary: '#DA121A', secondary: '#0F47AF', accent: '#FFFFFF' } },
];
