import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

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

export { auth };
