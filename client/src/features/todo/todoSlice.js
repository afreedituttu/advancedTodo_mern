import { createSlice } from "@reduxjs/toolkit";
import { addTodo, getTodo, getAllTodo, deleteTodo, updateTodo } from "./todoActions";

export const todoSlice = createSlice({
    name:'global',
    initialState:{
        todos:[],
        todo:{},
        loading:false,
        error:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addTodo.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(addTodo.fulfilled, (state, action)=>{
            state.loading = false
            state.todos.push(action.payload.todo)
        })
        .addCase(addTodo.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(getAllTodo.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getAllTodo.fulfilled, (state, action)=>{
            state.loading = false
            state.todos = action.payload.todo
        })
        .addCase(getAllTodo.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(getTodo.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getTodo.fulfilled, (state, action)=>{
            state.loading = false
            state.todo = action.payload.todo;
        })
        .addCase(getTodo.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        // work from here
        .addCase(updateTodo.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(updateTodo.fulfilled, (state, action)=>{
            state.loading = false
            const targetIndex = state.todos.findIndex(todo=>todo._id==action.payload._id)
            state.todos[targetIndex] = action.payload;
        })
        .addCase(updateTodo.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(deleteTodo.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(deleteTodo.fulfilled, (state, action)=>{
            state.loading = false
            const targetIndex = state.todos.findIndex(todo=>todo._id==action.payload._id)
            state.todos.splice(targetIndex, 1)
        })
        .addCase(deleteTodo.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export default todoSlice.reducer