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
    async({email, password, redirect}, thunkApi) => {
        try{
            const {data} = await axios.post(URL+'auth/login',{
                email, password
            })
            return data
        }catch({response}){
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