const Todo = require('../models/todo')
const CustomError = require('../utilities/CustomError')
const asyncHandler = require('express-async-handler')

const GetAll_todo = asyncHandler(async(req, res)=>{
    const user_todos = await Todo.find({userId: req.user._id})
    res.json({success:true,todo:user_todos}).status(200);
})

const Get_todo = asyncHandler(async(req, res)=>{
    const { id } = req.params
    const todo = await Todo.findOne({_id:id});
    res.json({success:true,todo}).status(200)
})

const Add_todo = asyncHandler(async(req, res)=>{
    const { name, content, status } = req.body;
    if(!name || !content){
        throw new CustomError("Necessary details are not filled", 400)
    }
    const todo = Todo({
        userId:req.user._id,
        name:name,
        content:content,
    })
    const saved_todo = await todo.save()
    res.json({success:true, todo:saved_todo}).status(200)
})

const Delete_todo = asyncHandler(async(req, res)=>{
    const { id } = req.params;
    if(!id){
        throw new CustomError("Id is required", 400)
    }
    await Todo.findByIdAndDelete(id);
    res.json({success:true}).status(200)
})

const Update_todo = asyncHandler(async(req, res)=>{
    const { name, content, status } = req.body;
    const {id} = req.params
    if(!id){
        throw new CustomError("Id is required", 400)
    }
    const updated_todo = await Todo.findByIdAndUpdate(id, {
        $set:{name, content, status}
    }, {new:true})
    res.json({success:true,updated_todo}).status(200)
})

module.exports = {GetAll_todo, Get_todo, Add_todo, Delete_todo, Update_todo}