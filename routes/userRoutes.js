import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
} from '../controllers/userController.js';
import { auth } from '../middleware/authentication.js';
const router = express.Router();

//Login Route
router.post('/users/login', authUser);

//Register Route
router.post('/users/', registerUser);

//Profile Route
router.get('/users/profile', auth, getUserProfile);

//Update User Profile
router.put('/users/profile', auth, updateUserProfile);


export default router;
