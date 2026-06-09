const fs = require('fs');

const nationsSrc = fs.readFileSync('backend/src/seed/data/nations.js', 'utf8');
const nameToCode = {};
for (const match of nationsSrc.matchAll(/name:\s*'([^']+)',\s*code:\s*'([^']+)'/g)) {
  nameToCode[match[1]] = match[2];
}
// Edge cases from fixture.md
nameToCode['Bosnia & Herzegovina'] = 'BIH';
nameToCode['Bosnia'] = 'BIH';
nameToCode['Curaçao'] = 'CUW';
nameToCode['Côte d’Ivoire'] = 'CIV';
nameToCode['IR Iran'] = 'IRN';
nameToCode['Türkiye'] = 'TUR';
nameToCode['South Korea'] = 'KOR';
nameToCode['Cabo Verde'] = 'CPV';
nameToCode['Congo DR'] = 'COD';

const stadiumMap = {
  'Mexico City Stadium': 'Estadio Azteca',
  'Guadalajara Stadium': 'Estadio Akron',
  'Toronto Stadium': 'BMO Field',
  'Los Angeles Stadium': 'SoFi Stadium',
  'Boston Stadium': 'Gillette Stadium',
  'BC Place Vancouver': 'BC Place',
  'Houston Stadium': 'NRG Stadium',
  'Dallas Stadium': 'AT&T Stadium',
  'Philadelphia Stadium': 'Lincoln Financial Field',
  'Monterrey Stadium': 'Estadio BBVA',
  'Atlanta Stadium': 'Mercedes-Benz Stadium',
  'Seattle Stadium': 'Lumen Field',
  'Miami Stadium': 'Hard Rock Stadium',
  'Kansas City Stadium': 'GEHA Field at Arrowhead Stadium',
  'Met Life Stadium': 'MetLife Stadium',
  'San Francisco Bay Area Stadium': 'Levi\'s Stadium',
  'New York/New Jersey Stadium': 'MetLife Stadium',
  'GEHA Field at Arrowhead Stadium': 'GEHA Field at Arrowhead Stadium'
};

const md = fs.readFileSync('fixture.md', 'utf8');
const lines = md.split('\n');
let matches = [];

let inGroup = false;
let inR32 = false;
let inR16 = false;
let inQF = false;
let inSF = false;
let in3rd = false;
let inFinal = false;

for (let line of lines) {
  if (line.includes('## Group Stage')) { inGroup = true; continue; }
  if (line.includes('## Round of 32')) { inGroup = false; inR32 = true; continue; }
  if (line.includes('## Round of 16')) { inR32 = false; inR16 = true; continue; }
  if (line.includes('## Quarter Finals')) { inR16 = false; inQF = true; continue; }
  if (line.includes('## Semi Finals')) { inQF = false; inSF = true; continue; }
  if (line.includes('## Play-off for 3rd Place')) { inSF = false; in3rd = true; continue; }
  if (line.includes('## Final')) { in3rd = false; inFinal = true; continue; }
  
  if (!line.startsWith('| **')) continue;
  
  const cols = line.split('|').map(c => c.trim()).filter(c => c);
  if (cols.length < 5) continue;
  
  const matchNum = parseInt(cols[0].replace(/\*\*/g, ''), 10);
  const dateStr = cols[1]; // '12 June 2026, 00:30 AM'
  
  const parts = dateStr.split(' ');
  const day = parts[0];
  const monthStr = parts[1];
  const year = parts[2].replace(',', '');
  const time = parts[3];
  const period = parts[4];
  
  const monthMapDate = { 'June': '06', 'July': '07' };
  let month = monthMapDate[monthStr];
  let [hours, mins] = time.split(':');
  hours = parseInt(hours, 10);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  // IST time. Subtract 5:30 to get UTC
  let utcHours = hours - 5;
  let utcMins = parseInt(mins, 10) - 30;
  let utcDay = parseInt(day, 10);
  if (utcMins < 0) {
    utcMins += 60;
    utcHours -= 1;
  }
  if (utcHours < 0) {
    utcHours += 24;
    utcDay -= 1;
  }
  
  // Handle month rollover (specifically July 1st -> June 30th)
  if (utcDay === 0) {
    if (month === '07') {
      month = '06';
      utcDay = 30; // June has 30 days
    }
  }
  
  const isoDate = `2026-${month}-${utcDay.toString().padStart(2, '0')}T${utcHours.toString().padStart(2, '0')}:${utcMins.toString().padStart(2, '0')}:00Z`;
  const kickoffIST = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} IST`;
  
  let stadiumRaw = cols[4].split(' (')[0].trim();
  let stadium = stadiumMap[stadiumRaw] || stadiumRaw;
  
  if (inGroup) {
    const teams = cols[2].split(' vs ');
    const homeTeamName = teams[0].trim();
    const awayTeamName = teams[1].trim();
    const homeCode = nameToCode[homeTeamName] || homeTeamName;
    const awayCode = nameToCode[awayTeamName] || awayTeamName;
    const group = cols[3].replace(/\*\*/g, '');
    
    matches.push({
      matchNumber: matchNum,
      home: homeCode,
      away: awayCode,
      date: isoDate,
      kickoffIST: kickoffIST,
      stadium: stadium,
      group: group,
      round: 'Group Stage',
      bracketPosition: `GS-${group}${matchNum}`
    });
  } else {
    // Knockouts
    let round = '';
    let bp = '';
    if (inR32) { round = 'Round of 32'; bp = `R32-${matchNum - 72}`; }
    if (inR16) { round = 'Round of 16'; bp = `R16-${matchNum - 88}`; }
    if (inQF) { round = 'Quarter Final'; bp = `QF-${matchNum - 96}`; }
    if (inSF) { round = 'Semi Final'; bp = `SF-${matchNum - 100}`; }
    if (in3rd) { round = 'Third Place'; bp = '3RD'; }
    if (inFinal) { round = 'Final'; bp = 'FINAL'; }
    
    const teams = cols[2].split(' vs ');
    matches.push({
      matchNumber: matchNum,
      homePlaceholder: teams[0].trim(),
      awayPlaceholder: teams[1].trim(),
      date: isoDate,
      kickoffIST: kickoffIST,
      stadium: stadium,
      group: null,
      round: round,
      bracketPosition: bp
    });
  }
}

let out = 'export const fixturesData = [\n';
matches.forEach(m => {
  out += '  { ';
  out += `matchNumber: ${m.matchNumber}, `;
  if (m.home) out += `home: '${m.home}', away: '${m.away}', `;
  else out += `homePlaceholder: '${m.homePlaceholder}', awayPlaceholder: '${m.awayPlaceholder}', `;
  out += `date: '${m.date}', kickoffIST: '${m.kickoffIST}', stadium: '${m.stadium.replace(/'/g, "\\'")}', `;
  out += `group: ${m.group ? "'"+m.group+"'" : 'null'}, round: '${m.round}', bracketPosition: '${m.bracketPosition}' `;
  out += '},\n';
});
out += '];\n';

fs.writeFileSync('backend/src/seed/data/fixtures.js', out);
console.log('Done rewriting backend/src/seed/data/fixtures.js');
