const router = require('express').Router()
const CustomError = require('../utilities/CustomError')
const asyncHandler = require('express-async-handler')

router.get('/', asyncHandler( async(req, res)=>{
    throw new CustomError("test", 500)
    return res.json({success:true}).status(200)
}))

module.exports = router