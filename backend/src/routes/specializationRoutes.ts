import express from 'express';
import { getSpecs } from '../controllers/specializationsController';


const router = express.Router();

router.get('/', getSpecs);

export default router;
