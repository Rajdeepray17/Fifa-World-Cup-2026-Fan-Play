import { Router } from 'express';
import {
  getPlayers,
  getPlayerById,
  getPlayersByNation,
  getPlayersByNationCode,
  bulkInsertPlayers,
} from '../controllers/playerController.js';
import { validateObjectId } from '../middleware/validate.js';

const router = Router();

router.get('/', getPlayers);
router.post('/bulk', bulkInsertPlayers);
router.get('/nation/code/:code', getPlayersByNationCode);
router.get('/nation/:nationId', validateObjectId('nationId'), getPlayersByNation);
router.get('/:id', validateObjectId('id'), getPlayerById);

export default router;
