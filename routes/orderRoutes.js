const express = require('express');
const { addOrderItems } = require('../controllers/orderController');
const { auth } = require('../middleware/authentication');

const router = express.Router();

router.post('/orders/', auth, addOrderItems);

module.exports = router;
