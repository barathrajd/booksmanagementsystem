import express from 'express';
const router = express.Router();
import productRouter from './productRoutes.js';
import userRouter from './userRoutes.js';

// Product Route
router.use('/api', productRouter);

//User Route
router.use('/api', userRouter);

export default router;
