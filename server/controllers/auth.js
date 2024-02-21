const asyncHandler = require('express-async-handler')
const CustomError = require('../utilities/CustomError')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { jwt_sign } = require('../middlewares/jwt')

const Login = asyncHandler( async(req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        throw new CustomError("Necessary details not filled", 400)
    }
    const user = await User.findOne({username})
    console.log(user);
    if(!user){
        throw new CustomError("User not exist", 404)
    }
    if(!await bcrypt.compare(password, user.password)){
        throw new CustomError("Password doesnt match", 404)
    }
    const token = jwt_sign({userId:user._id});
    return res.status(200).json({success:true, token:token, user:{username:user.username, email:user.email,userId:user._id,}})
})

const Signup = asyncHandler( async(req, res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        throw new CustomError("Necessary details are not filled", 404)
    }
    const user = User({
        username:username,
        email:email,
        password: await bcrypt.hash(password, 10)
    })
    await user.save()
    res.status(200).json({success:true})
})

module.exports = {Login, Signup}