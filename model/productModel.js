const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestampes: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    isbn: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    published: { type: String, required: true },
    publisher: { type: String, required: true },
    pages: { type: Number, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestampes: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
