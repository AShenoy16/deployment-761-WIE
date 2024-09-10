import express from 'express';
import { getSpecByName, getSpecs, updateSpecByName } from '../controllers/specializationsController';


const router = express.Router();

router.get('/', getSpecs);
router.get('/:name', getSpecByName);
router.patch("/:name", updateSpecByName);

export default router;
