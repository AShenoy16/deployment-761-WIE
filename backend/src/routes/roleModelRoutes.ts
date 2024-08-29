import express from 'express';
import { getRoleModels } from '../controllers/roleModelController';

const router = express.Router();

router.get('/', getRoleModels);

export default router;
