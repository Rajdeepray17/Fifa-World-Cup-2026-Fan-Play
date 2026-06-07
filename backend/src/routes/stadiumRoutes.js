import { Router } from 'express';
import { getStadiums, getStadiumById } from '../controllers/stadiumController.js';
import { validateObjectId } from '../middleware/validate.js';

const router = Router();

router.get('/', getStadiums);
router.get('/:id', validateObjectId('id'), getStadiumById);

export default router;
