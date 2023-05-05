const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(decoded.isAdmin){
              req.user = decoded
              next()
            }
            else{
            req.user = await User.findById(decoded.id)
            next()
            }
        } catch (error) {
            res.status(401)
            throw new Error("Token failed")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("No Token")
    }
})

const verifyTokenAndAuthorization = (req, res, next) => {
  protect(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAdmin = (req, res, next) => {
    protect(req, res, () => {
      if (req.user&&req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

module.exports ={protect,verifyTokenAdmin,verifyTokenAndAuthorization}