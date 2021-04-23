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
router.post('/login', authUser);

//Register Route
router.post('/', registerUser);

//Profile Route
router.get('/profile', auth, getUserProfile);

//Update User Profile
router.put('/profile', auth, updateUserProfile);

module.exports = router;
