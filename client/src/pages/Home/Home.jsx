import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../context/context'
import Navbar from '../../components/Navbar';
import {URL} from '../../constants'
import axios from 'axios';
import List from '../../components/Todo/List';
import contextHook from '../../Hooks/contextHook';
import Add from '../../components/Todo/Add'

const Home = () => {
  const {setTodo} = contextHook();
  const [error, setError] = useState();
  useEffect(()=>{
    async function getTodo(){
      try{
        const {data} = await axios.get(URL+'todo',{
          headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(data);
        setTodo(data.todo);
      }catch({response}){
        setError(response.data.message);
      }
    };
    getTodo();
  },[])
  return (
    <div>
    <Navbar />
    <div className="p-5">
      <span className=' text-center text-2xl text-gray-900 py-3'>TODO'S :</span>
      <div className=" flex justify-between p-3 w-10/12 mx-auto">
        <List editAble={true} />
        <Add />
      </div>
    </div>
    </div>
  )
}

export default Home
