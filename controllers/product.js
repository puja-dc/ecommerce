const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: 'Product not found'
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    // check for all fields
    const {
      name,
      category,
      release,
      price,
      quantity,
      image,
      shipping
    } = fields;

    // if (
    //   !name ||
    //   !category ||
    //   !release ||
    //   !price ||
    //   !quantity ||
    //   !image ||
    //   !shipping
    // ) {
    //   return res.status(400).json({
    //     error: 'All fields are required. Please check data and re-enter.'
    //   });
    // }

    let product = new Product(fields);

    if (files.image) {
      if (files.image.size > 1000000) {
        return res.status(400).json({
          error: 'Image is too large. Please upload an image less than 1MB'
        });
      }
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        });
      }
      res.json(result);
    });
  });
};
