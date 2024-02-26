import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import { URL } from '../../constants';
import contextHook from '../../Hooks/contextHook'

const Profile = () => {
  const {setUser:context_setUser} = contextHook();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [enableUpdate, setEnableUpdate] = useState(false);
  const update_style = 'bg-blue-600 px-3 py-1 transition text-white'
  const normal_style = 'bg-gray-500 px-3 py-1 text-white'
  if(error){
    console.log(error);
  }
  
  const config = {
    headers:{
      "authorization":`Bearer ${localStorage.getItem('token')}`
    }
  }
  useEffect(()=>{
    async function retrieve(){
      try{
        const {data} = await axios.get(URL+'user', config);
        console.log(data);
        setUser(data.user)
      }catch({response}){
        console.log(response.data.message);
        setUser(null)
        setError(response.data.message);
      }
    }
    retrieve();
  },[])
  const onchange = (e)=> {
    setEnableUpdate(true)
    const {name, value} = e.target;
    setUser((old_user)=>{
      return {
        ...old_user,
        [name]:value
      }
    })
  }
  const update = async()=> {
    try{
      if(!onchange){
        return console.log('connot be updated without any changes');
      }
      const {data} = await axios.put(URL+'user', {
        ...user
      }, config)
      setUser(data.user);
      console.log(data.user);
      context_setUser(data.user)
      setEnableUpdate(false)
    }catch({response}){
      setUser(null);
      setError(response.data.message);
    }
  }
  const delete_account = async()=> {
    try{
      console.log('id ',user.userId);
      const {data} = await axios.delete(URL+'user',{
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(data);
      // setUser(null);
    }catch({response}){
      // setUser(null);
      console.log(response.data.message);
      setError(response.data.message);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="p-5 flex justify-center items-center h-screen">
        <form className='flex flex-col gap-2 bg-slate-300 p-3' onSubmit={(e)=>{
          e.preventDefault()
        }}>
          <div className='flex justify-between items-center gap-3'>user id : <input type="text" className=' border-b-2 border-black p-1' value={user && user.userId} disabled='true' name='userId' /></div>
          <div className='flex justify-between items-center gap-3'>username : <input type="text" className=' border-b-2 border-black p-1' value={user && user.username} onChange={onchange} name='username' /></div>
          <div className='flex justify-between items-center gap-3'>email : <input type="text" className=' border-b-2 border-black p-1' value={user && user.email} onChange={onchange} name='email' /></div>
          <button className={enableUpdate?update_style:normal_style} onClick={update} disabled={!enableUpdate}>Update</button>
          <button className={'bg-red-500 px-3 py-1 text-white'} onClick={delete_account} >Delete account</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
