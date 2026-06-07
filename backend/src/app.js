import express from 'express';
import cors from 'cors';
import nationRoutes from './routes/nationRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import fixtureRoutes from './routes/fixtureRoutes.js';
import stadiumRoutes from './routes/stadiumRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

/* Health check */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'fifa-world-cup-2026-api', version: '2.0.0' });
});

/* API Routes */
app.use('/api/nations', nationRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/stadiums', stadiumRoutes);

/* Error handling */
app.use(notFound);
app.use(errorHandler);

export default app;