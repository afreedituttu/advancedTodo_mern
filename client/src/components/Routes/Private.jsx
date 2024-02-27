import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { context } from '../../context/context'
import { URL } from '../../constants';
import axios from 'axios';

const Private = () => {
    const bool = localStorage.getItem('token') ? true : false;
    const [auth, setAuth] = useState(bool);
    const {setUser} = useContext(context);
    const navigate = useNavigate();
    const config = {
        headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
        }
    }
    useEffect(()=>{
        async function getUser(){
            try{
                const {data} = await axios.get(URL + 'user/private', config);
                setAuth(true)
                setUser(data.user);
            }catch({response}){
                setAuth(false)
                setUser(null)
                localStorage.removeItem('token');
            }
        }
        getUser();
    }, [bool, navigate])
  return (auth?<Outlet />:<Navigate to='/login' />)
}

export default Private
