const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100
    },
    category: {
      type: { ObjectId },
      ref: 'Category',
      required: true
    },
    release: {
      type: String,
      required: true,
      maxlength: 32
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32
    },
    quantity: {
      type: Number
    },
    image: {
      data: Buffer,
      contentType: String
    },
    shipping: {
      type: Boolean,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
