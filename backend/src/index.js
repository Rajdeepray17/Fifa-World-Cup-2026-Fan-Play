import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { syncOfficialBracket } from './controllers/fixtureController.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);
      // Perform initial bracket synchronization
      await syncOfficialBracket();
      console.log('✓ Startup bracket synchronization complete.');
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });