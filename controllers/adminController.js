const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

// @desc Get All Users
// @route GET /api/admin/users/
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = { getUsers };
