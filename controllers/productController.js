const productModel = require("../models/productModel");
const { deleteOne, updateOne, getOne, createOne, getAll } = require("./handlerFactory");

// @desc   get list of products
// @route  get /api/v1/products
// @access  public
const getProducts = getAll(productModel);

// @desc   Create product
// @route  post /api/v1/products
// @access  private
const createProduct = createOne(productModel);

// @desc   get specific product by id
// @route  get /api/v1/products/:id
// @access  public
const getProduct = getOne(productModel);

// @desc   update product by id
// @route  put /api/v1/products/:id
// @access  private
const updateProduct = updateOne(productModel);

// @desc   delete product by id
// @route  delete /api/v1/products/:id
// @access  private
const deleteProduct = deleteOne(productModel);

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
