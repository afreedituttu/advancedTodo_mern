import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, getUser, getProfile, updateProfile, deleteProfile } from "./userActions";
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
            state.error = false
            state.loading = false
            state.userObject = action.payload.user
        })
        .addCase(getUser.rejected, (state, action)=>{
            state.loading = false
            localStorage.removeItem('token')
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
        })
        .addCase(userRegister.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(userRegister.fulfilled, (state, action)=>{
            state.error = false
            state.loading = false
        })
        .addCase(userRegister.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(getProfile.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getProfile.fulfilled, (state, action)=>{
            state.error = false
            state.loading = false
            state.userObject = action.payload.user
        })
        .addCase(getProfile.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
            state.userObject = null
            localStorage.removeItem('token')
        })
        .addCase(updateProfile.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(updateProfile.fulfilled, (state, action)=>{
            state.error = false
            state.loading = false
            state.userObject = action.payload.user
        })
        .addCase(updateProfile.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
        .addCase(deleteProfile.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(deleteProfile.fulfilled, (state, action)=>{
            state.error = false
            state.loading = false
            state.userObject = null
            localStorage.removeItem('token')
        })
        .addCase(deleteProfile.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer