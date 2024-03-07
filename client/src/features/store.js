import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import todoReducer from './todo/todoSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        todo:todoReducer
    }
})

export default store