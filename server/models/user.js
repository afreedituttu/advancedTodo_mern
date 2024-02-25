const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide a username"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "Please provide a email"]
    },
    password:{
        type:String,
        required:[true, "Please provide password"]
    }
})

module.exports = mongoose.model('users', userSchema)