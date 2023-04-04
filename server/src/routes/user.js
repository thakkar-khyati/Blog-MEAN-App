const express = require("express");
const User = require("../model/user");
const { getAllUser, getUser, login,createUser,updateUser,deleteUser } = require("../service/user.service");
const router = express.Router();

const storage = require("../middleware/userStorage");

//get all the user
router.get("/", getAllUser);

//get user by id
router.get("/:id",getUser);

//login user
router.post("/login", login);


//create user
router.post("/", storage, createUser);

//update user
router.put("/:id", storage, updateUser);

//delete user
router.delete("/:id", deleteUser);

module.exports = router;
