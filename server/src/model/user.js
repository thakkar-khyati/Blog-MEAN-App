const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

roles = ['admin','user']

const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
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
    validate(value) {
      if (!roles.includes(value)) {
        throw new Error("role must either be admin or user");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength:6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('password can not be "password"');
      }
    },
  },
  avatar: {
    type: String,
  },
  tokens:[{
    token:{
      type:String,
    }
  }]
},{
  timestamps:true
})

//login function
userSchema.statics.findByCredentials = async(email, password)=>{
  const user = await User.findOne({email})
  if(!user){
    throw new Error("unable to login")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    console.log("not matched")
    throw new Error('unable to login')
  }
  return user
}

//generating JWT Tokens for login and signup
userSchema.methods.getAuthToken = async function(){
  const user = this
  const token = jwt.sign({_id:user.id.toString()},'thisismyblogtask')

  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

//hashing password
userSchema.pre('save', async function(next){
  const user = this
  
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,8)
  }

  next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;
