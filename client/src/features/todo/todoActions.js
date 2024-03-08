import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants";

export const addTodo = createAsyncThunk(
    'todo/add',
    async({name, content}, thunkApi) => {
        try{
            const config = {
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }
            const {data} = await axios.post(URL+'todo',{
                name, content
            }, config);
            return data;
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)
export const getTodo = createAsyncThunk(
    'todo/get',
    async({id}, thunkApi) => {
        try{
            const {data} = await axios.get(URL+`todo/${id}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            });
            return data;
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)
export const getAllTodo = createAsyncThunk(
    'todo/getall',
    async(_, thunkApi) => {
        try{
            const {data} = await axios.get(URL+'todo/',{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            });
            return data;
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)
export const updateTodo = createAsyncThunk(
    'todo/update',
    async({_id, name, content, status}, thunkApi) => {
        try{
            const config = {
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
            await axios.put(URL+'todo/',{
                id:_id, name, content, status
            },config)
            return {_id, name, content, status};
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)
export const deleteTodo = createAsyncThunk(
    'todo/delete',
    async({id}, thunkApi) => {
        try{
            await axios.delete(URL+`todo/${id}`,{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            });
            return id;
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)