import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { nationsData } from './data/nations.js';
import { playersData as existingPlayers } from './data/players.js';

// Formation required: 3 GKs, 8 Defenders, 8 Midfielders, 7 Attackers = 26 players
const POSITIONS = {
  GK: 3,
  CB: 4,
  LB: 2,
  RB: 2,
  CDM: 2,
  CM: 4,
  CAM: 2,
  LW: 2,
  RW: 2,
  ST: 3,
};

const REGIONS = {
  SPANISH: {
    firstNames: ['Alejandro', 'Diego', 'Carlos', 'Javier', 'Mateo', 'Leonardo', 'Thiago', 'Santiago', 'Juan', 'Luis', 'Miguel', 'Jose', 'Andres', 'Fernando', 'Sergio'],
    lastNames: ['Garcia', 'Martinez', 'Rodriguez', 'Lopez', 'Hernandez', 'Gonzalez', 'Perez', 'Sanchez', 'Ramirez', 'Torres', 'Flores', 'Gomez', 'Diaz', 'Cruz', 'Morales']
  },
  ENGLISH: {
    firstNames: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald'],
    lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson']
  },
  PORTUGUESE: {
    firstNames: ['Joao', 'Jose', 'Antônio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas', 'Luiz', 'Marcos', 'Rafael', 'Marcelo', 'Bruno', 'Eduardo', 'Felipe'],
    lastNames: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida']
  },
  FRENCH: {
    firstNames: ['Jean', 'Michel', 'Philippe', 'Alain', 'Patrick', 'Nicolas', 'Christophe', 'Pierre', 'Christian', 'Eric', 'Mathieu', 'Laurent', 'Stéphane', 'David', 'Julien'],
    lastNames: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia']
  },
  GERMAN_DUTCH: {
    firstNames: ['Lukas', 'Maximilian', 'Jakob', 'Felix', 'Jonas', 'Leon', 'Tim', 'Tom', 'Julian', 'Jan', 'Paul', 'Luis', 'Finn', 'Max', 'Niclas'],
    lastNames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein']
  },
  ITALIAN_BALKAN: {
    firstNames: ['Luka', 'Ivan', 'Mario', 'Mateo', 'Marko', 'Nikola', 'Filip', 'Josip', 'Ante', 'Petar', 'Karlo', 'Duje', 'Borna', 'Domagoj', 'Lovro'],
    lastNames: ['Kovač', 'Horvat', 'Novak', 'Marić', 'Jurić', 'Vidović', 'Knežević', 'Vuković', 'Marković', 'Petrović', 'Tomić', 'Kovačić', 'Pavlović', 'Božić', 'Grgić']
  },
  ARABIC: {
    firstNames: ['Mohammed', 'Ahmed', 'Ali', 'Hussein', 'Hassan', 'Abdullah', 'Mahmoud', 'Omar', 'Tariq', 'Ibrahim', 'Khaled', 'Fahad', 'Saud', 'Youssef', 'Salem'],
    lastNames: ['Al-Dosari', 'Al-Muwallad', 'Al-Shehri', 'Al-Faraj', 'Al-Dawsari', 'Al-Owais', 'Al-Brikan', 'Al-Amri', 'Al-Najei', 'Al-Burayk', 'Al-Shahrani', 'Al-Malki', 'Al-Khabrani', 'Al-Khaibari', 'Al-Ghannam']
  },
  ASIAN: {
    firstNames: ['Min-jae', 'Heung-min', 'Kang-in', 'Hee-chan', 'Jae-sung', 'Gue-sung', 'In-beom', 'Woo-young', 'Seung-gyu', 'Jin-su', 'Tae-hwan', 'Kyung-won', 'Chang-hoon', 'Ui-jo', 'Sang-ho'],
    lastNames: ['Kim', 'Lee', 'Park', 'Choi', 'Jeong', 'Kang', 'Jo', 'Yoon', 'Jang', 'Lim', 'Han', 'Oh', 'Seo', 'Shin', 'Kwon']
  },
  AFRICAN: {
    firstNames: ['Sadio', 'Kalidou', 'Edouard', 'Ismaila', 'Idrissa', 'Cheikhou', 'Nampalys', 'Bamba', 'Pape', 'Boulaye', 'Famara', 'Habib', 'Abdou', 'Fode', 'Moustapha'],
    lastNames: ['Mane', 'Koulibaly', 'Mendy', 'Sarr', 'Gueye', 'Kouyate', 'Diatta', 'Dieng', 'Diallo', 'Cisse', 'Ballo-Toure', 'Gomis', 'Ndiaye', 'Seck', 'Thiam']
  }
};

const getRegionForNation = (nationCode) => {
  const code = nationCode.toUpperCase();
  if (['MEX', 'ESP', 'ARG', 'COL', 'URU', 'PAR', 'PAN', 'CRC', 'ECU'].includes(code)) return REGIONS.SPANISH;
  if (['USA', 'ENG', 'CAN', 'AUS', 'NZL', 'SCO', 'IRL', 'WAL'].includes(code)) return REGIONS.ENGLISH;
  if (['BRA', 'POR', 'CPV'].includes(code)) return REGIONS.PORTUGUESE;
  if (['FRA', 'CIV', 'CMR', 'COD', 'MLI'].includes(code)) return REGIONS.FRENCH;
  if (['GER', 'NED', 'AUT', 'SUI'].includes(code)) return REGIONS.GERMAN_DUTCH;
  if (['CRO', 'SRB', 'BIH', 'SVN', 'ITA'].includes(code)) return REGIONS.ITALIAN_BALKAN;
  if (['QAT', 'KSA', 'IRN', 'IRQ', 'JOR', 'MAR', 'ALG', 'TUN', 'EGY'].includes(code)) return REGIONS.ARABIC;
  if (['JPN', 'KOR'].includes(code)) return REGIONS.ASIAN;
  if (['SEN', 'GHA', 'RSA', 'NGA'].includes(code)) return REGIONS.AFRICAN;
  return REGIONS.ENGLISH; // fallback
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generatePlayersForNation = (nationCode) => {
  const players = [];
  let shirtNumber = 1;
  const region = getRegionForNation(nationCode);

  for (const [pos, count] of Object.entries(POSITIONS)) {
    for (let i = 1; i <= count; i++) {
      
      const isGK = pos === 'GK';
      const isAttacker = ['LW', 'RW', 'ST', 'CF'].includes(pos);
      const isMidfielder = ['CDM', 'CM', 'CAM'].includes(pos);

      let caps = getRandomInt(0, 100);
      let age = getRandomInt(18, 36);
      let goals = 0;
      let assists = 0;

      if (isAttacker) {
        goals = getRandomInt(0, Math.floor(caps * 0.5));
        assists = getRandomInt(0, Math.floor(caps * 0.3));
      } else if (isMidfielder) {
        goals = getRandomInt(0, Math.floor(caps * 0.2));
        assists = getRandomInt(0, Math.floor(caps * 0.4));
      } else if (!isGK) {
        goals = getRandomInt(0, Math.floor(caps * 0.1));
        assists = getRandomInt(0, Math.floor(caps * 0.1));
      }

      // Generate realistic name
      const firstName = region.firstNames[getRandomInt(0, region.firstNames.length - 1)];
      const lastName = region.lastNames[getRandomInt(0, region.lastNames.length - 1)];

      players.push({
        name: `${firstName} ${lastName}`,
        club: `${nationCode} FC`,
        position: pos,
        shirtNumber: shirtNumber++,
        age,
        caps,
        goals,
        assists,
        preferredFoot: Math.random() > 0.2 ? 'Right' : 'Left',
        isCaptain: shirtNumber === 11, // Arbitrary captain assignment
      });
    }
  }
  return players;
};

const main = () => {
  const finalPlayersData = { ...existingPlayers };
  
  let generatedCount = 0;
  const hardcodedNations = ['ARG', 'BRA', 'FRA', 'ENG'];
  
  nationsData.forEach(nation => {
    // Only skip if it's one of the 4 hardcoded real teams, or if it's a placeholder nation
    if (!hardcodedNations.includes(nation.code) && !nation.isPlaceholder) {
      finalPlayersData[nation.code] = generatePlayersForNation(nation.code);
      generatedCount++;
    }
  });

  const outputContent = `/**
 * Representative Player Squads — ALL 48 NATIONS.
 * Includes real players for ARG, BRA, FRA, ENG.
 * Includes generated 26-man squads for all other non-placeholder nations.
 */

export const playersData = ${JSON.stringify(finalPlayersData, null, 2)};
`;

  const outputPath = path.join(__dirname, 'data', 'players.js');
  fs.writeFileSync(outputPath, outputContent, 'utf-8');
  console.log(`Successfully generated squads for ${generatedCount} nations.`);
};

main();
