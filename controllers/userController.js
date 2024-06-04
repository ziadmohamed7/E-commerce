const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const { deleteOne, getOne, createOne, getAll } = require("./handlerFactory");

// @desc   get list of users
// @route  get /api/v1/users
// @access  privet
const getUsers = getAll(User);

// @desc   Create user
// @route  post /api/v1/users
// @access  private
const createUser = createOne(User);

// @desc   get specific user by id
// @route  get /api/v1/users/:id
// @access  public
const getUser = getOne(User);

// @desc   update user by id
// @route  put /api/v1/users/:id
// @access  private
const updateUser = asyncHandler(async (req, res, next) => {
  const updateDocument = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      role: req.body.role,
      profileImage: req.body.profileImage,
    },
    { new: true }
  );

  if (!updateDocument) {
    return next(new ApiError("product not found! !!", 404));
  }
  res.status(200).json({ data: updateDocument });
});

// @desc   update user password by id
// @route  update /api/v1/users/changePassword/:id
// @access  private
const changePassword = asyncHandler(async (req, res, next) => {
  const changePass = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 10),
    },
    { new: true }
  );
  if (!changePass) {
    return next(new ApiError("can't update password !!", 404));
  }
  res.status(200).json({ data: changePass });
});

// @desc   delete user by id
// @route  delete /api/v1/users/:id
// @access  private
const deleteUser = deleteOne(User);

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
};
