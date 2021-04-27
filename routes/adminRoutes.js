const express = require('express');
const { getUsers, deleteUser } = require('../controllers/adminController');
const { auth, admin } = require('../middleware/authentication');
const router = express.Router();

// GET All users
router.get('/users', auth, admin, getUsers);

// Delete a User
router.delete('/user/:id', auth, admin, deleteUser);

module.exports = router;
