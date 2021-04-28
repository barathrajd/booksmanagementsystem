const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Product = require('../model/productModel');

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

// @desc Get User By Id User
// @route Get /api/admin/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc Update Any User
// @route PUT /api/admin/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not found');
  }
});

// @desc Fetch all products
// @route DELETE /api/admin/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product Removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Create a Product
// @route POST /api/admin/products/
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product({
    isbn: 'Enter ISBN',
    title: 'Book Title',
    user: req.user._id,
    image: '/images/default.svg',
    subtitle: 'Enter Subtitle',
    author: 'Author Name',
    published: Date('2014-12-14T00:00:00.000Z'),
    publisher: 'Enter Publisher',
    pages: 472,
    description: 'Enter discription',
    price: 0,
    rating: 0,
    countInStock: 0,
    numReviews: 0,
  });

  const createdProduct = await product.save();
  res.json(createdProduct);
});

// @desc Update a Product
// @route PUT /api/admin/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    isbn,
    title,
    subtitle,
    author,
    image,
    published,
    publisher,
    pages,
    description,
    price,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.isbn = isbn;
    product.user = req.user._id;
    product.title = title;
    product.subtitle = subtitle;
    product.author = author;
    product.image = image;
    product.published = published;
    product.publisher = publisher;
    product.pages = pages;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  deleteProduct,
  createProduct,
  updateProduct,
};
