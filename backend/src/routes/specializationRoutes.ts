import express from 'express';
import { getSpecByName, getSpecs } from '../controllers/specializationsController';


const router = express.Router();

router.get('/', getSpecs);
router.get('/:name', getSpecByName);

export default router;
