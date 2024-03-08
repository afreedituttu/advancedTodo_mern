import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, getUser } from "./userActions";
import { useNavigate } from "react-router-dom";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        userObject:null,
        loading:false,
        error:false
    },
    reducers:{
        logoutUser: (state) => {
            state.userObject = null
            localStorage.removeItem('token')
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUser.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getUser.fulfilled, (state, action)=>{
            state.loading = false
            state.userObject = action.payload.user
        })
        .addCase(getUser.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(userLogin.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(userLogin.fulfilled, (state, action)=>{
            state.loading = false
            state.error = null
        })
        .addCase(userLogin.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
            localStorage.removeItem('token')
        })
        .addCase(userRegister.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(userRegister.fulfilled, (state, action)=>{
            state.loading = false
        })
        .addCase(userRegister.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer