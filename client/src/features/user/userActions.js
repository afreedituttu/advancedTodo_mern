import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants";

export const getUser = createAsyncThunk(
    'user/get',
    async(_, thunkApi) => {
        try{
            const {data} = await axios.get(URL+'user/private',{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            return data;
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)

export const userLogin = createAsyncThunk(
    'user/login',
    async({email, password}, thunkApi) => {
        try{
            const {data} = await axios.post(URL+'auth/login',{
                email, password
            })
            localStorage.setItem('token', data.token)
            return data
        }catch({response}){
            localStorage.removeItem('token')
            return thunkApi.rejectWithValue(response.data);
        }
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async({username, email, password}, thunkApi) => {
        try{
            await axios.post(URL+'auth/signup', {
                username, email, password
            })
            return
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)

export const getProfile = createAsyncThunk(
    'user/profile',
    async(_, thunkApi) => {
        try{
            const {data} = await axios.get(URL+'user',{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            return data;
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async({username, email}, thunkApi) => {
        try{
            const config = {
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }
            const {data} = await axios.put(URL+'user',{
                username, email
            }, config)
            return data
        }catch({response}){
            return thunkApi.rejectWithValue(response.data);
        }
    }
)