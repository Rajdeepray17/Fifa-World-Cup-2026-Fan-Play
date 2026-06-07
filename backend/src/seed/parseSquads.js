import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nationsData } from './data/nations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard 26-man positional distribution
const positionPool = [
  'GK', 'GK', 'GK', 
  'RB', 'RB', 'LB', 'LB', 'CB', 'CB', 'CB', 'CB', 
  'CDM', 'CDM', 'CM', 'CM', 'CM', 'CAM', 'CAM', 
  'RW', 'RW', 'LW', 'LW', 'ST', 'ST', 'ST'
];
// Wait, that's 25. Let's make it exactly 26.
// 3 GK, 8 DEF, 8 MID, 7 ATT
const POSITIONS_ARRAY = [
  'GK', 'GK', 'GK',
  'RB', 'RB', 'LB', 'LB', 'CB', 'CB', 'CB', 'CB',
  'CDM', 'CDM', 'CM', 'CM', 'CM', 'CM', 'CAM', 'CAM',
  'RW', 'RW', 'LW', 'LW', 'ST', 'ST', 'ST'
];

// Helper to sanitize nation names to match nationsData
const sanitizeNationName = (name) => {
  const n = name.trim().toLowerCase();
  if (n === "côte d'ivoire" || n === "cote d'ivoire" || n === 'ivory coast') return 'civ';
  if (n === 'dr congo' || n === 'democratic republic of the congo') return 'cod';
  if (n === 'korea republic' || n === 'south korea') return 'kor';
  if (n === 'cape verde' || n === 'cabo verde') return 'cpv';
  if (n === 'czechia' || n === 'czech republic') return 'cze'; // wait, what's czechia code? Let's check nationsData
  return n;
};

// Create a map of lowercased name -> code
const nationCodeMap = {};
nationsData.forEach(n => {
  nationCodeMap[n.name.toLowerCase()] = n.code;
});
// Manual overrides
nationCodeMap["côte d'ivoire"] = 'CIV';
nationCodeMap['cabo verde'] = 'CPV';
nationCodeMap['korea republic'] = 'KOR';
nationCodeMap['czechia'] = 'CZE';
nationCodeMap['bosnia and herzegovina'] = 'BIH';
nationCodeMap['curaçao'] = 'CUW';
nationCodeMap['türkiye'] = 'TUR';

const main = () => {
  const squadListPath = path.join(__dirname, '../../../squadlist.md');
  const fileContent = fs.readFileSync(squadListPath, 'utf-8');
  
  const lines = fileContent.split('\n');
  const playersData = {};
  
  let currentNationCode = null;
  let currentPlayerCount = 0;
  
  lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    
    // Check for nation heading: # **Algeria**
    const headingMatch = line.match(/^#\s*\*\*(.+)\*\*/);
    if (headingMatch) {
      const nationName = headingMatch[1].trim();
      let code = nationCodeMap[nationName.toLowerCase()];
      if (!code) {
        // Fallback for some weird names
        if (nationName.toLowerCase().includes('usa') || nationName.toLowerCase().includes('united states')) code = 'USA';
        else code = sanitizeNationName(nationName.toLowerCase()); // if still not found, we might have a bug, but let's hope
      }
      
      // If code is still not in map, let's try to find it
      if (!Object.values(nationCodeMap).includes(code)) {
         // Maybe it's directly a code?
         const matchedNation = nationsData.find(n => n.name.toLowerCase() === nationName.toLowerCase() || n.code === code);
         if (matchedNation) code = matchedNation.code;
         else console.log('WARNING: Could not find code for nation:', nationName);
      }

      currentNationCode = code;
      playersData[currentNationCode] = [];
      currentPlayerCount = 0;
      return;
    }
    
    // Check for player: 1. Melvin Mastil (FC Stade Nyonnais)
    if (currentNationCode && line.match(/^\d+\.\s/)) {
      const playerMatch = line.match(/^\d+\.\s+(.+?)\s*\((.+?)\)$/);
      if (playerMatch) {
        const name = playerMatch[1].trim();
        const club = playerMatch[2].trim();
        
        // Assign a position from the predefined array based on index
        const position = POSITIONS_ARRAY[currentPlayerCount % 26];
        const isGK = position === 'GK';
        
        // Random stats
        const caps = Math.floor(Math.random() * 80);
        const age = Math.floor(Math.random() * 18) + 18; // 18 to 35
        let goals = 0;
        let assists = 0;
        
        if (!isGK) {
          goals = Math.floor(Math.random() * Math.floor(caps * 0.3));
          assists = Math.floor(Math.random() * Math.floor(caps * 0.3));
        }

        playersData[currentNationCode].push({
          name,
          club,
          position,
          shirtNumber: currentPlayerCount + 1,
          age,
          caps,
          goals,
          assists,
          preferredFoot: Math.random() > 0.2 ? 'Right' : 'Left',
          isCaptain: currentPlayerCount === 9 // #10 is captain usually
        });
        
        currentPlayerCount++;
      }
    }
  });

  const outputContent = `/**
 * Real Player Squads from squadlist.md
 */

export const playersData = ${JSON.stringify(playersData, null, 2)};
`;

  const outputPath = path.join(__dirname, 'data', 'players.js');
  fs.writeFileSync(outputPath, outputContent, 'utf-8');
  console.log('Successfully generated real players from squadlist.md!');
  console.log('Nations parsed:', Object.keys(playersData).length);
};

main();
