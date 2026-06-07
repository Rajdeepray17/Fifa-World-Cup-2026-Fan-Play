import { Router } from 'express';
import {
  getFixtures,
  getFixtureById,
  getFixturesByGroup,
  getFixturesByRound,
} from '../controllers/fixtureController.js';
import { validateObjectId, validateGroup, validateRound } from '../middleware/validate.js';

const router = Router();

router.get('/', getFixtures);
router.get('/group/:group', validateGroup, getFixturesByGroup);
router.get('/round/:round', validateRound, getFixturesByRound);
router.get('/:id', validateObjectId('id'), getFixtureById);

export default router;
