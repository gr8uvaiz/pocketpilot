import express from 'express';

import transactionRoutes from './transaction.route';
import categoryRoutes from './category.route';
import authRoutes from './auth.route';
import walletRoutes from './wallet.route';
import dashboardRoutes from "./dashboard.route";

const router = express.Router();

router.use('/transactions', transactionRoutes);
router.use('/categories', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);
router.use('/dashboard', dashboardRoutes)

export { router };