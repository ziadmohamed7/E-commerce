const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  changePassword,
  deleteUser,
} = require("../controllers/userController");

const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changePasswordValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

// route specific for change password
router.put("/changePassword/:id", changePasswordValidator, changePassword);

// routes
router.route("/").post(createUserValidator, createUser).get(getUsers);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
