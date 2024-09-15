import express from 'express';
import { getMultipliers } from '../controllers/multiplierController';

const router = express.Router();

router.get('/', getMultipliers);

export default router;
