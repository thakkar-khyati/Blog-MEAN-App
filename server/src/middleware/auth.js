const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async(req,res,next)=>{
    try {
        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, "thisismyblogtask");
        const user = await User.findOne({
          _id: decoded._id,
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
        res.status(401).send({error:'please authenticate'})
    }
    // next()
}

module.exports = auth 