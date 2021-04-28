const express = require('express');
const {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  deleteProduct,
  createProduct,
  updateProduct,
} = require('../controllers/adminController');
const { auth, admin } = require('../middleware/authentication');
const router = express.Router();

// GET All users
router.get('/users', auth, admin, getUsers);

// Delete a User
router.delete('/user/:id', auth, admin, deleteUser);

// GET User By Id
router.get('/users/:id', auth, admin, getUserById);

// Update User
router.put('/users/:id', auth, admin, updateUser);

// Delete Product
router.delete('/products/:id', auth, admin, deleteProduct);

// Create Product
router.post('/products/', auth, admin, createProduct);

// Update Product
router.put('/products/:id', auth, admin, updateProduct);

module.exports = router;
