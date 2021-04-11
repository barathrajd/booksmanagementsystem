const express = require('express');
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require('../controllers/userController');
const { auth } = require('../middleware/authentication');
const router = express.Router();

//Login Route
router.post('/users/login', authUser);

//Register Route
router.post('/users/', registerUser);

//Profile Route
router.get('/users/profile', auth, getUserProfile);

//Update User Profile
router.put('/users/profile', auth, updateUserProfile);

module.exports = router;
