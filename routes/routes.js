const express = require('express');
const router = express.Router();
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');
const orderRouter = require('./orderRoutes');
const adminRouter = require('./adminRoutes');
const uploadRouter = require('./uploadRoutes');

// Product Route
router.use('/products', productRouter);

//User Route
router.use('/users', userRouter);

// Order Route
router.use('/orders', orderRouter);

// Admin Route
router.use('/admin', adminRouter);

// Admin Route
router.use('/upload', uploadRouter);

module.exports = router;
