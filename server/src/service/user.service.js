const path = require("path");
const User = require("../model/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const getAllUser = async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log("can not connect with server");
    res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      return res.status(400).send("user not found");
    }
    res.send(user);
  } catch (error) {
    console.log("can not connect with server");
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthToken();
    user.tokens = user.tokens.concat({ token });
    res.send({ user, token });
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
      console.log("User not Found");
      return res.status(400).send("user not found");
    }
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("can not connect with server");
    res.status(500).send();
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      res.status(400).send("User not found");
    }
    user.avatar = "http://localhost:3000/images/" + req.file.filename;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("can not connect with the server");
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log("User not Found");
      return res.status(400).send("user not found");
    }
    const filename = user.avatar.replace("http://localhost:3000/images/", "");
    const directoryPath = "/home/aspire001/node/Blog-mean/server/images/";
    const path = directoryPath + filename;
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.send(user);
  } catch (error) {
    console.log("can not connect with server");
    res.status(500).send(error);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user) {
      console.log("user not found");
      res.status(400).send("user not found");
    }

    const JSON_SECRET = "someBlogSeceretForJsonWebToken";
    const secret = JSON_SECRET + user[0].password;

    const payload = {
      email: user[0].email,
      _id: user[0]._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "60m" });

    const link = `http://localhost:4200/reset-password/${user[0]._id}/${token}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "elisa.nader@ethereal.email",
        pass: "zPth1HKbeJSfJpVSWb",
      },
    });

    let info = await transporter.sendMail({
      from:'"khyati thakkar" <khyatithakkar@gmail.com>',
      to:user[0].email,
      subject:'Reset Password for Blog User',
      text:link,
      html:`<a href=${link}>click here<a>`
    })

    res.send(info);
  } catch (error) {
    console.log("can not connect to server");
    res.status(500).send(error);
  }
};

const UserforResetPassword = async(req,res)=>{
  try {
    const user = await User.findById(req.params._id)
    if(!user){
      console.log("user not found")
      res.status(400).send("user not found")
    }

    const JSON_SECRET = "someBlogSeceretForJsonWebToken";
    const secret = JSON_SECRET + user.password

    const payload = jwt.verify(req.params.token, secret)
    res.send(payload)
  } catch (error) {
    console.log("can not connect to server")
    res.status(500).send(error)
  }
}

const resetPassword = async(req,res)=>{
  try {
    const user = await User.findById(req.body.id)
    if(!user){
      console.log("user not found")
      res.status(400).send("user not found")
    }
    user.password = req.body.password
    await user.save()
    res.send(user)
  } catch (error) {
    console.log("can not connect to server")
    res.status(500).send(error)
  }
}

const logOut = async (req,res)=>{
  try {
    const user = await User.findById(req.body._id)
    user.tokens = []
    await user.save()
    res.send(user)
  } catch (error) {
    
    res.status(500).send(error)
  }
}

module.exports = {
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
  logOut
};
