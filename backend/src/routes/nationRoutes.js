import { Router } from 'express';
import {
  getNations,
  getNationById,
  getNationByCode,
  updateNationStatus,
} from '../controllers/nationController.js';
import { validateObjectId } from '../middleware/validate.js';

const router = Router();

router.get('/', getNations);
router.get('/code/:code', getNationByCode);
router.get('/:id', validateObjectId('id'), getNationById);
router.put('/:id/status', validateObjectId('id'), updateNationStatus);

export default router;
