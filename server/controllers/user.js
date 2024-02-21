const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const private_details = asyncHandler(async(req, res)=>{
    res.json({
        success:true,
        user:req.user
    })
})

const update_profile = asyncHandler(async(req, res)=>{
    //
})

const delete_profile = asyncHandler(async(req, res)=>{
    //
})

module.exports = { private_details, update_profile, delete_profile }