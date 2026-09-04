import express from 'express';

import { createTransactionController, getTransactionsPaginatedController } from '../controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, createTransactionController);
router.get('/', authMiddleware, getTransactionsPaginatedController);

export default router;