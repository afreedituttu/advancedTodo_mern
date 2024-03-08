import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../features/user/userActions';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const { error, loading} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email:"",
    password:""
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
  const submit = async()=> {
    dispatch(userLogin(input)).then((res)=>{
      if(res.type == "user/login/fulfilled"){
        navigate('/')
      }
    });
  }
  return (
    <div className=' p-5 flex justify-center h-screen items-center'>
    {error && error}
      <form onSubmit={(e)=>{
        e.preventDefault()
        submit()
        }} className='p-3 bg-slate-200 flex flex-col gap-1'>
        email : <input value={input.email} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='email' type="email" placeholder='Email'/>
        password : <input value={input.password} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='password' type="password" placeholder='Password'/>
        <button disabled={loading} className={`text-white bg-green-${loading?400:500} py-1 my-2`} type='submit'>Login</button>
        <Link to='/signup' className=' py-2 text-center text-blue-600'>Dont have an account ? Signup</Link>
      </form>
    </div>
  )
}

export default Login
