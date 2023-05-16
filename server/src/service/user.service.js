const path = require("path");
const User = require("../model/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

const utill = require("../utill.js")

const getAllUser = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(utill.status.success).send(users);
  } catch (error) {
    console.log("can not connect with server");
    res.status(utill.status.serverError).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      return res.status(utill.status.badRequest).send(utill.message.badRequest);
    }
    res.status(utill.status.success).send(user);
  } catch (error) {
    console.log("can not connect with server");
    res.status(utill.status.serverError).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthToken();
    const refreshToken = await user.getRefreshToken()
    user.tokens = user.tokens.concat({ token });
    user.refreshTokens = user.refreshTokens.concat({refreshToken})
    res.status(utill.status.success).send({ user, token, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(utill.status.badRequest).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    imagePath = process.env.imageURL + req.file.filename;
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
    res.status(utill.status.success).send(user);
  } catch (error) {
    res.status(utill.status.serverError).send(error);
    console.log("can not connect with server");
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not Found");
      return res.status(utill.status.badRequest).send(utill.message.badRequest);
    }
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    res.status(utill.status.success).send(user);
  } catch (error) {
    console.log("can not connect with server");
    res.status(utill.status.serverError).send(utill.message.serverError);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      res.status(utill.status.badRequest).send(utill.message.badRequest);
    }
    user.avatar = process.env.imageURL + req.file.filename;
    await user.save();
    res.status(utill.status.success).send(user);
  } catch (error) {
    console.log("can not connect with the server");
    res.status(utill.status.serverError).send(utill.message.serverError);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log("User not Found");
      return res.status(utill.status.badRequest).send(utill.message.badRequest);
    }
    const filename = user.avatar.replace(process.env.imageURL, "");
    const directoryPath = process.env.imagePath;
    const path = directoryPath + filename;
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(utill.status.success).send(user);
  } catch (error) {
    console.log("can not connect with server");
    res.status(utill.status.serverError).send(error);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user) {
      console.log("user not found");
      res.status(utill.status.badRequest).send(utill.message.badRequest);
    }

    const JSON_SECRET = process.env.JSON_SECRET;
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

    res.status(utill.status.success).send(info);
  } catch (error) {
    console.log("can not connect to server");
    res.status(utill.status.serverError).send(error);
  }
};

const UserforResetPassword = async(req,res)=>{
  try {
    const user = await User.findById(req.params._id)
    if(!user){
      console.log("user not found")
      res.status(utill.status.badRequest).send(utill.message.badRequest)
    }

    const JSON_SECRET = process.env.JSON_SECRET;
    const secret = JSON_SECRET + user.password

    const payload = jwt.verify(req.params.token, secret)
    res.status(utill.status.success).send(payload)
  } catch (error) {
    console.log("can not connect to server")
    res.status(utill.status.serverError).send(error)
  }
}

const resetPassword = async(req,res)=>{
  try {
    const user = await User.findById(req.body.id)
    if(!user){
      console.log("user not found")
      res.status(utill.status.badRequest).send(utill.message.badRequest)
    }
    user.password = req.body.password
    await user.save()
    res.status(utill.status.success).send(user)
  } catch (error) {
    console.log("can not connect to server")
    res.status(utill.status.serverError).send(error)
  }
}

const logOut = async (req,res)=>{
  try {
    const user = await User.findById(req.body._id)
    user.tokens = []
    await user.save()
    res.status(utill.status.success).send(user)
  } catch (error) {
    console.log("can not connect to server");
    res.status(utill.status.serverError).send(error)
  }
}

const refreshToken = async(req,res)=>{
  try {
    const refreshToken = req.body.refreshToken
    const secret = process.env.REFRESH_TOKEN_SECRET
    const payload = jwt.verify(refreshToken, secret)
    const user = await User.findById(payload.id)
    user.refreshTokens = []
    user.tokens = []
    const newToken = await user.getAuthToken()
    const newRefreshToken = await user.getRefreshToken()
    res.status(utill.status.success).send({user, newToken, newRefreshToken})
  } catch (error) {
    console.log("can not connect to server");
    res.status(utill.status.serverError).send('error')
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
  logOut,
  refreshToken
};
