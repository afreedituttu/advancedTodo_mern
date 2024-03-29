const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false,
        required:true
    }
})

module.exports = mongoose.model('todo', todoSchema);