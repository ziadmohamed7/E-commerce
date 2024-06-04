const categoryModel = require('../models/categoryModel');
const { deleteOne, updateOne, getOne, createOne, getAll } = require("./handlerFactory");

// @desc   get list of categories
// @route  get /api/v1/categories
// @access  public 
exports.getCategories = getAll(categoryModel);

// @desc   Create category
// @route  post /api/v1/categories
// @access  private 
exports.createCategory = createOne(categoryModel);

// @desc   get specific category by id
// @route  get /api/v1/categories/:id
// @access  public 
exports.getCategory = getOne(categoryModel);

// @desc   update category by id
// @route  put /api/v1/categories/:id
// @access  private 
exports.updateCategory = updateOne(categoryModel);

// @desc   delete category by id
// @route  delete /api/v1/categories/:id
// @access  private 
exports.deleteCategory = deleteOne(categoryModel);