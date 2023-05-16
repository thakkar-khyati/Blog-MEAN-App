const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv")

dotenv.config()

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if(isTokenExpired(token)===true){
      return res.status(419).send()
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });

    if (!user) {
      console.log("error");
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate" });
  }
};

function isTokenExpired(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const expiritionTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return expiritionTime < currentTime;
  } catch (error) {
    return true
  }
}

module.exports = auth;
