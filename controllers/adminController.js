const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

// @desc Get All Users
// @route GET /api/admin/users/
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete User
// @route Delete /api/admin/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

module.exports = { getUsers, deleteUser };
