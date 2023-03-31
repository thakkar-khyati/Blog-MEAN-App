const express = require("express");
const User = require("../model/user");
const multer = require("multer");
const sharp = require("sharp");
const router = express.Router();

const storage = require('../middleware/userStorage')

//get all the user
router.get("/", async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

//get user by id
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    //res.status(400).send(error);
  }
});

//logout user
router.post("/user/logout/:id",async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

//create user
router.post("/",storage, async (req, res) => {
  try {
    imagePath = "http://localhost:3000/images/" + req.file.filename;
    let user = await User({
      name: req.body.name,
      email: req.body.email,
      mNumber: req.body.mNumber,
      role: req.body.role,
      password: req.body.password,
      avatar: imagePath,
    });
    await user.save();
    const token = await user.getAuthToken();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

//update user
router.put("/:id",storage, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send();
    }
    updates.forEach((update) => {
      if(update === 'avatar'){
        user.avatar = 'http://localhost:3000/images/'+req.file.filename
      }else{
        user[update] = req.body[update];
      }
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
