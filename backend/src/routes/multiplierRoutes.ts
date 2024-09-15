import express from 'express';
import { getMultipliers, updateMultipliers } from '../controllers/multiplierController';
import { update } from '@firebase/database';

const router = express.Router();

router.get('/', getMultipliers);
router.put('/', updateMultipliers)

export default router;
