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

module.exports = router;
