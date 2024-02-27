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

const get_profile = asyncHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        user:{
            username:req.user.username,
            userId:req.user._id,
            email:req.user.email,
            password:req.user.password
        }
    })
})

const update_profile = asyncHandler(async(req, res)=>{
    console.log('calling update');
    const { username, email} = req.body;
    const updated_user = await User.findByIdAndUpdate(req.user._id, {
        $set:{username, email}
    },{new:true})
    res.status(200).json({
        success:true,
        user:{
            username:updated_user.username,
            userId:updated_user.userId,
            email:updated_user.email
        }
    })
})

const delete_profile = asyncHandler(async(req, res)=>{
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
        success:true
    })
})

module.exports = { private_details, get_profile, update_profile, delete_profile }