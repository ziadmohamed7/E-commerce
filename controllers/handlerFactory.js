const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const apiFeatures = require("../utils/apiFeatures");

// const apiFeatures = require("../utils/apiFeatures");

// @desc   delete product by id
// @route  delete /api/v1/products/:id
// @access  private
const deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findOneAndDelete({ _id: id });
    if (!document) {
      return next(new ApiError("document not found! !!", 404));
    }
    res.status(200).json({ data: document });
  });

const updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const updateDocument = await model.findByIdAndUpdate(
      req.params.id ,
      req.body,
      { new: true }
    );
    console.log(updateDocument);
    if (!updateDocument) {
      return next(new ApiError("product not found! !!", 404));
    }
    res.status(200).json({ data: updateDocument });
  });

// error cycle asyncHandler(async) ==> express error handler
const getOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findById(req.params.id);
    if (!document) {
      return next(new ApiError("document not found! !!", 404));
    }
    res.status(200).json({ data: document });
  });

const createOne = (model) =>
  asyncHandler(async (req, res) => {
    const newProduct = await model.create(req.body);
    res.status(201).json({ data: newProduct });
  });

const getAll = (model) =>
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line new-cap
    const features = new apiFeatures(req.query, model.find())
      .search(model)
      .fields()
      .filter()
      .paginate()
      .sorting();
    const document = await features.mongooseQuery;

    res.status(200).json({ results: document.length, data: document });
  });

module.exports = { deleteOne, updateOne, getOne, createOne, getAll };
