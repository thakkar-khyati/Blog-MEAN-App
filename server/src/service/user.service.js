const path = require("path");
const User = require("../model/user");
const fs = require("fs");

const getAllUser = async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found')
      return res.status(400).send("user not found");
    }
    res.send(user);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //const token = await user.getAuthToken();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    imagePath = "http://localhost:3000/images/" + req.file.filename;
    let user = await User({
      name: req.body.name,
      email: req.body.email,
      mNumber: req.body.mNumber,
      role: req.body.role,
      password: req.body.password,
      address: req.body.address,
      Dob: req.body.Dob,
      hobbies: req.body.hobbies,
      avatar: imagePath,
    });
    await user.save();
    //const token = await user.getAuthToken();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log("can not connect with server");
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not Found")
      return res.status(400).send("user not found");
    }
    updates.forEach((update) => {
      if (update === "avatar") {
        user.avatar = "http://localhost:3000/images/" + req.file.filename;
      } else {
        user[update] = req.body[update];
      }
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log('User not Found')
      return res.status(400).send("user not found");
    }
    const filename = user.avatar.replace("http://localhost:3000/images/","");
    const directoryPath = "/home/aspire001/node/Blog-mean/server/images/";
    const path = directoryPath+filename
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    
    res.send(user);
  } catch (error) {
    console.log('can not connect with server')
    res.status(500).send(error);
  }
};

module.exports = {
  getAllUser,
  getUser,
  login,
  createUser,
  updateUser,
  deleteUser,
};
