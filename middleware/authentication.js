const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const auth = asyncHandler(async (req, res, next) => {
  // Geting token from 'x-auth-token' header
  const token = req.get('x-auth-token');

  // If token not present throw error
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Failed', error: 'Token not present' });
  }

  try {
    // Decode the token if error throw error
    let decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

    // Set decoded result to request
    req.user = await User.findById(decodedToken.id).select('-password');

    // Continue with pipeline
    next();
  } catch {
    return res.status(401).json({ message: 'Failed', error: 'Invalid token' });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an Admin');
  }
};

module.exports = { auth, admin };
