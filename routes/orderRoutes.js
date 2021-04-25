const express = require('express');
const {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getMyOrders,
} = require('../controllers/orderController');
const { auth } = require('../middleware/authentication');

const router = express.Router();

router.post('/', auth, addOrderItems);
router.get('/myorders', auth, getMyOrders);
router.get('/:id', auth, getOrderByID);
router.put('/:id/pay', auth, updateOrderToPaid);

module.exports = router;
