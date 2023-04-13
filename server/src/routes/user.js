const express = require("express");
const User = require("../model/user");
const {
  getAllUser,
  getUser,
  login,
  createUser,
  updateUser,
  updateAvatar,
  deleteUser,
  forgetPassword,
  UserforResetPassword,
  resetPassword,
  logOut,
  refreshToken
} = require("../service/user.service");
const router = express.Router();

const storage = require("../middleware/userStorage");
const auth = require("../middleware/auth");

//get all the user
router.get("/",auth, getAllUser);

//get user by id
router.get("/:id",auth, getUser);

//login user
router.post("/login", login);

//create user
router.post("/", [auth,storage] , createUser);

//update user
router.patch("/:id",auth, updateUser);

//update user avatar
router.patch("/avatar/:id",[auth,storage], updateAvatar);

//delete user
router.delete("/:id",auth, deleteUser);

//sending link to email
router.post("/forget-password",forgetPassword)

//getting user for which password is changed
router.get("/reset-password/:_id/:token",UserforResetPassword)

//resetting password
router.post("/reset-password",resetPassword)

//logout
router.post('/logout',logOut)

//refreshToken
router.post("/refreshToken",refreshToken)

module.exports = router;
