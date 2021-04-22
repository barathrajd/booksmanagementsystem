const express = require('express');
const {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
} = require('../controllers/orderController');
const { auth } = require('../middleware/authentication');

const router = express.Router();

router.post('/orders/', auth, addOrderItems);
router.get('/orders/:id', auth, getOrderByID);
router.put('/orders/:id/pay', auth, updateOrderToPaid);
router.get('/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

module.exports = router;
