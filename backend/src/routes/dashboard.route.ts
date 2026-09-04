import express from 'express';
import { getDashboardController } from '../controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();


router.get('/', authMiddleware, getDashboardController);

export default router