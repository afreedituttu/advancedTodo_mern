import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../features/user/userActions';

const Profile = () => {
  const [input, setInput] = useState({
    username:null,
    email:null
  });
  const {userObject:user, error} = useSelector(state=>state.user);
  const [enableUpdate, setEnableUpdate] = useState(false);
  const update_style = 'bg-blue-600 px-3 py-1 transition text-white'
  const normal_style = 'bg-gray-500 px-3 py-1 text-white'
  const dispatch = useDispatch();
  useEffect(()=>{
    getProfile()
  },[])
  const onchange = (e)=> {
    setEnableUpdate(true)
    setInput((old_input)=>{
      const {name, value} = e.target;
      return {
        ...user,
        ...old_input,
        [name]:value
      }
    })
  }
  const update = async()=> {
    dispatch(updateProfile({
      username:input.username?input.username:user.username,
      email:input.email?input.email:user.email
    })).then((res)=>{
      if(res.type == 'user/updateProfile/fulfilled'){
        alert('updated')
      }
    })
    // try{
    //   const {data} = await axios.put(URL+'user', {
    //     ...user
    //   }, config)
    //   setUser(data.user);
    //   context_setUser(data.user)
    //   setEnableUpdate(false)
    // }catch({response}){
    //   setUser(null);
    //   setMessage(response.data.message);
    // }
  }
  const delete_account = async()=> {
    // try{
    //   const {data} = await axios.delete(URL+'user',{
    //     headers:{
    //       authorization:`Bearer ${localStorage.getItem('token')}`
    //     }
    //   })
    // }catch({response}){
    //   setMessage(response.data.message);
    // }
  }
  return (
    <div>
      <Navbar />
      <div className="p-5 flex justify-center items-center h-screen">
        {error}
        <form className='flex flex-col gap-2 bg-slate-300 p-3' onSubmit={(e)=>{
          e.preventDefault()
        }}>
          <div className='flex justify-between items-center gap-3'>user id : <input type="text" className=' border-b-2 border-black p-1' value={user && user.userId} disabled='true' name='userId' /></div>
          <div className='flex justify-between items-center gap-3'>current username : <input disabled type="text" className=' border-b-2 border-black p-1' value={user && user.username} name='username' /></div>
          <div className='flex justify-between items-center gap-3'>new username : <input type="text" className=' border-b-2 border-black p-1' value={input.username} onChange={onchange} name='username' /></div>
          <div className='flex justify-between items-center gap-3'>current email : <input disabled type="text" className=' border-b-2 border-black p-1' value={user && user.email} name='email' /></div>
          <div className='flex justify-between items-center gap-3'>new email : <input type="text" className=' border-b-2 border-black p-1' value={input.email} onChange={onchange} name='email' /></div>
          <button className={enableUpdate?update_style:normal_style} onClick={update} disabled={!enableUpdate}>Update</button>
          <button className={'bg-red-500 px-3 py-1 text-white'} onClick={delete_account} >Delete account</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
