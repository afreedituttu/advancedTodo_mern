const Todo = require('../models/todo')
const CustomError = require('../utilities/CustomError')
const asyncHandler = require('express-async-handler')

const GetAll_todo = asyncHandler(async(req, res)=>{
    const user_todos = await Todo.find({userId: req.user._id}).select({content:0});
    res.status(200).json({success:true,todo:user_todos});
})

const Get_todo = asyncHandler(async(req, res)=>{
    const { id } = req.params
    const todo = await Todo.findOne({_id:id,userId:req.user._id});
    res.status(200).json({success:true,todo})
})

const Add_todo = asyncHandler(async(req, res)=>{
    console.log(req.body);
    const { name, content } = req.body;
    if(!name || !content){
        throw new CustomError("Necessary details are not filled", 400)
    }
    const todo = Todo({
        userId:req.user._id,
        name:name,
        content:content,
    })
    const saved_todo = await todo.save()
    res.status(200).json({success:true, todo:saved_todo})
})

const Delete_todo = asyncHandler(async(req, res)=>{
    const { id } = req.params;
    if(!id){
        throw new CustomError("Id is required", 400)
    }
    await Todo.findOneAndDelete({_id:id, userId:req.user._id});
    res.status(200).json({success:true})
})

const Update_todo = asyncHandler(async(req, res)=>{
    const { name, content, status, id } = req.body;
    if(!id){
        throw new CustomError("Id is required", 400)
    }
    const updated_todo = await Todo.findOneAndUpdate({_id:id, userId:req.user._id}, {
        $set:{name, content, status}
    }, {new:true})
    res.status(200).json({success:true,updated_todo})
})

module.exports = {GetAll_todo, Get_todo, Add_todo, Delete_todo, Update_todo}