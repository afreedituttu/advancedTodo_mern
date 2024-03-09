import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { getUser } from '../../features/user/userActions';
import {useDispatch} from 'react-redux'

const Private = () => {
    const bool = localStorage.getItem('token') ? true : false;
    const [auth, setAuth] = useState(bool);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getUser()).then((res)=>{
            if(!res.type == "user/get/fulfilled"){
                setAuth(false)
                navigate('/login')
            }
        })
    }, [bool])
  return (auth?<Outlet />:<Navigate to='/login' />)
}

export default Private
