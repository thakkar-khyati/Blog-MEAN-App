const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

roles = ["admin", "user", "writer"];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    mNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      default: "user",
      validate(value) {
        if (!roles.includes(value)) {
          throw new Error("role must either be admin or user");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('password can not be "password"');
        }
      },
    },
    address: {
      type: String,
      required: true,
    },
    Dob: {
      type: Date,
      required: true,
    },
    hobbies: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//login function
userSchema.statics.findByCredentials = async (email, password) => {
  const promise = new Promise(async (res, rej) => {
    const user = await User.findOne({ email });
    if (!user) {
      // throw new Error("unable to login")
      rej("Incorrect Email or Password");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        //throw new Error('unable to login')
        rej("Incorrect Email or Password");
      }
    }

    res(user);
  });
  return promise;
};

//generating JWT Tokens for login and signup
userSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, "thisismyblogtask");

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//hashing password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
