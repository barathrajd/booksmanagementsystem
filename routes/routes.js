const express = require('express');
const router = express.Router();
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');

// Product Route
router.use('/api', productRouter);

//User Route
router.use('/api', userRouter);

module.exports = router;
