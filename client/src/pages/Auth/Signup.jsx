import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../features/user/userActions';

const Signup = () => {
  const navigate = useNavigate();
  const { error, loading} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username:"",
    email:"",
    password:"",
  });
  const onchange = (e)=> {
    const {name, value} = e.target;
    setInput((old_input)=>{
      return({
        ...old_input,
        [name]:value
      })
    })
  }
  const submit = ()=> {
    dispatch(userRegister(input)).then((res)=>{
      if(res.type == "user/register/fulfilled"){
        navigate('/login')
      }
    })
  }
  return (
    <div className=' p-5 flex flex-col justify-center w-full h-screen items-center'>
      <form onSubmit={(e)=>{
        e.preventDefault()
        submit()
       }} className='p-3 bg-slate-200 flex flex-col gap-1'>
        {error && <div className=" bg-red-400 text-white p-2">{error}</div>}
        username : <input value={input.username} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='username' type="text" placeholder='Email'/>
        email : <input value={input.email} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='email' type="email" placeholder='Email'/>
        password : <input value={input.password} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='password' type="password" placeholder='Password'/>
        <button disabled={loading} className={`text-white bg-green-${loading?400:500} py-1 my-2' type='submit`} >Register</button>
        <Link to='/login' className=' py-2 text-center text-blue-600'>Already have an account ? Login</Link>
      </form>
    </div>
  )
}

export default Signup