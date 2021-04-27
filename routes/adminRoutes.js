const express = require('express');
const { getUsers } = require('../controllers/adminController');
const { auth, admin } = require('../middleware/authentication');
const router = express.Router();

// GET All users
router.get('/users', auth, admin, getUsers);

module.exports = router;
