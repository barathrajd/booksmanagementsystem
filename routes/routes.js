const express = require('express');
const router = express.Router();
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');
const orderRouter = require('./orderRoutes');

// Product Route
router.use('/api', productRouter);

//User Route
router.use('/api', userRouter);

// Order Route
router.use('/api', orderRouter);

module.exports = router;
