import React, { useContext, useState } from 'react'
import { context } from '../../context/context';
import axios from 'axios';
import { URL } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(context);
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
    try{
      const {data} = await axios.post(URL+'auth/login',{
        email:input.email,
        password:input.password
      })
      console.log(data.user);
      localStorage.setItem('token', data.token);
      setUser(data.user)
      setTimeout(()=>{
        navigate('/')
      },1000)
    }catch({response}){
      console.log('error ',response.data.message);
      localStorage.removeItem('token')
      setUser(null)
    }
  }
  return (
    <div className=' p-5 flex justify-center h-screen items-center'>
    <Link to='/'>Home</Link>
      <form onSubmit={(e)=>{
        e.preventDefault()
        submit()
        }} className='p-3 bg-slate-200 flex flex-col gap-1'>
        email : <input value={input.email} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='email' type="email" placeholder='Email'/>
        password : <input value={input.password} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='password' type="password" placeholder='Password'/>
        <button className=' text-white bg-green-500 py-1 my-2' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
