const brandModel = require("../models/brandModel");
const { deleteOne, updateOne, getOne, createOne, getAll } = require("./handlerFactory");

// @desc   get list of brands
// @route  get /api/v1/brands
// @access  public
const getBrands = getAll(brandModel);

// @desc   Create brand
// @route  post /api/v1/brands
// @access  private
const createBrand = createOne(brandModel);

// @desc   get specific brand by id
// @route  get /api/v1/brands/:id
// @access  public
const getBrand = getOne(brandModel);

// @desc   update brand by id
// @route  put /api/v1/brands/:id
// @access  private
const updateBrand = updateOne(brandModel);

// @desc   delete brand by id
// @route  delete /api/v1/brands/:id
// @access  private
const deleteBrand = deleteOne(brandModel);

module.exports = { getBrands , getBrand,createBrand,updateBrand,deleteBrand};