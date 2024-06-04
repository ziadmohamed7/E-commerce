const subcategory = require("../models/subcategoryModel");
const { deleteOne, updateOne, getOne, createOne, getAll } = require("./handlerFactory");
// nested route 
// here i will get subCategories that belong to this categoryId
// Get /api/v1/categories/:categoryId/subCategories


// @desc   Get all subCategories
// @method Get /api/v1/subCategories
// @access public
const getSubcategories = getAll(subcategory);

// @desc   Create  subcategory
// @method Post /api/v1/subCategories
// @access private
const createSubcategory = createOne(subcategory);

// @desc   Get  subcategory by id
// @method Get /api/v1/subcategory/:id
// @access public
const getSpecificSubcategory = getOne(subcategory);

// @desc   Update  subcategory by id
// @method Put /api/v1/subCategories/:id
// @access private
const updateSpecificSubcategory = updateOne(subcategory);

// @desc   Update  subcategory by id
// @method Put /api/v1/subCategories/:id
// @access private
const deleteSpecificSubcategory = deleteOne(subcategory);

module.exports = {
  getSubcategories,
  createSubcategory,
  updateSpecificSubcategory,
  getSpecificSubcategory,
  deleteSpecificSubcategory,
};
