import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

/* Load env vars from the correct path */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import connectDB from '../config/db.js';
import Stadium from '../models/Stadium.js';
import Nation from '../models/Nation.js';
import Player from '../models/Player.js';
import Fixture from '../models/Fixture.js';

import { stadiumsData } from './data/stadiums.js';
import { nationsData } from './data/nations.js';
import { fixturesData } from './data/fixtures.js';
import { playersData } from './data/players.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    const isDrop = process.argv.includes('--drop');

    if (isDrop) {
      console.log('Dropping existing collections...');
      await Stadium.deleteMany();
      await Nation.deleteMany();
      await Player.deleteMany();
      await Fixture.deleteMany();
      console.log('Collections dropped successfully.');
    }

    console.log('Starting database seeding...');

    /* 1. Seed Stadiums */
    console.log('Seeding Stadiums...');
    const insertedStadiums = await Stadium.insertMany(stadiumsData);
    console.log(`✓ Seeded ${insertedStadiums.length} stadiums.`);

    /* Create a lookup map for stadiums by name */
    const stadiumMap = {};
    insertedStadiums.forEach(stadium => {
      stadiumMap[stadium.name] = stadium._id;
    });

    /* 2. Seed Nations */
    console.log('Seeding Nations...');
    const insertedNations = await Nation.insertMany(nationsData);
    console.log(`✓ Seeded ${insertedNations.length} nations.`);

    /* Create a lookup map for nations by code */
    const nationMap = {};
    insertedNations.forEach(nation => {
      nationMap[nation.code] = nation._id;
    });

    /* 3. Seed Players */
    console.log('Seeding Players...');
    const allPlayers = [];
    for (const [nationCode, players] of Object.entries(playersData)) {
      const nationId = nationMap[nationCode];
      if (nationId) {
        players.forEach(player => {
          allPlayers.push({ ...player, nation: nationId });
        });
      }
    }
    const insertedPlayers = await Player.insertMany(allPlayers);
    console.log(`✓ Seeded ${insertedPlayers.length} players across representative squads.`);

    /* 4. Seed Fixtures */
    console.log('Seeding Fixtures...');
    const mappedFixtures = fixturesData.map(fixture => {
      const mappedFixture = { ...fixture };
      
      /* Map stadium name to ObjectId */
      if (fixture.stadium && stadiumMap[fixture.stadium]) {
        mappedFixture.stadium = stadiumMap[fixture.stadium];
      }

      /* Map home/away nation codes to ObjectIds for group stage */
      if (fixture.home && nationMap[fixture.home]) {
        mappedFixture.homeTeam = nationMap[fixture.home];
      } else if (fixture.homePlaceholder) {
        mappedFixture.homeTeamPlaceholder = fixture.homePlaceholder;
      }

      if (fixture.away && nationMap[fixture.away]) {
        mappedFixture.awayTeam = nationMap[fixture.away];
      } else if (fixture.awayPlaceholder) {
        mappedFixture.awayTeamPlaceholder = fixture.awayPlaceholder;
      }

      return mappedFixture;
    });

    const insertedFixtures = await Fixture.insertMany(mappedFixtures);
    console.log(`✓ Seeded ${insertedFixtures.length} fixtures.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
