const express = require('express');
const router = express.Router();
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');
const orderRouter = require('./orderRoutes');

// Product Route
router.use('/products', productRouter);

//User Route
router.use('/users', userRouter);

// Order Route
router.use('/orders', orderRouter);

module.exports = router;
