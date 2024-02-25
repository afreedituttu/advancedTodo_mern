const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const private_details = asyncHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        user:{
            username:req.user.username,
            userId:req.user._id,
            email:req.user.email
        }
    })
})

const update_profile = asyncHandler(async(req, res)=>{
    //
})

const delete_profile = asyncHandler(async(req, res)=>{
    //
})

module.exports = { private_details, update_profile, delete_profile }