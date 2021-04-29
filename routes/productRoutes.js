const express = require('express');
const {
  getProductById,
  getProducts,
  createProductReview,
} = require('../controllers/productController');
const { auth } = require('../middleware/authentication');
const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/:id/reviews', auth, createProductReview);
module.exports = router;
