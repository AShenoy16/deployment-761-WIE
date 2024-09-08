import express from 'express';
import { getUsers, loginUsers } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.post('/', loginUsers)

export default router;
