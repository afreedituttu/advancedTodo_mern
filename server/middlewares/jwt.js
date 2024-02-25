const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const CustomError = require('../utilities/CustomError');
const User = require('../models/user');

const authentication = asyncHandler(async(req, res, next)=>{
    console.log(req.body);
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        throw new CustomError("Token not included", 404)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        throw new CustomError("Invalid Token", 404)
    }
    const user = await User.findById(decoded.userId);
    if(!user){
        throw new CustomError("Invalid Token", 404)
    }
    req.user = user
    next()
})

const jwt_sign = ( data )=> {
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn:'1d'})
}

module.exports = {authentication, jwt_sign}