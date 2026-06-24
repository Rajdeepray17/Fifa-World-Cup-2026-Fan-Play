import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Fixture from '../models/Fixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing.');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB:', process.env.MONGODB_URI);
    
    console.log('Resetting fixtures 89 to 104 (Round of 16 to Finals)...');
    const result = await Fixture.updateMany(
      { matchNumber: { $gte: 89 } },
      {
        $set: {
          homeTeam: null,
          awayTeam: null,
          winner: null,
          status: 'Scheduled',
          'score.home': 0,
          'score.away': 0,
          'score.penalties.home': null,
          'score.penalties.away': null
        }
      }
    );
    
    console.log(`Successfully reset ${result.modifiedCount} matches in the database.`);
  } catch (err) {
    console.error('Error resetting matches:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from DB.');
  }
}

run();
