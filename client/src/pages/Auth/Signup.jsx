import React, { useContext, useState } from 'react'
import { context } from '../../context/context';
import axios from 'axios';
import { URL } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(context);
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
  const submit = async()=> {
    try{
      const {data} = await axios.post(URL+'auth/signup',{
        username:input.username,
        email:input.email,
        password:input.password
      })
      console.log(data);
      setTimeout(()=>{
        navigate('/login')
      },1000)
    }catch({response}){
      console.log('error ',response.data.message);
      localStorage.removeItem('token')
      setUser(null)
    }
  }
  return (
    <div className=' p-5 flex justify-center h-screen items-center'>
      <form onSubmit={(e)=>{
        e.preventDefault()
        submit()
        }} className='p-3 bg-slate-200 flex flex-col gap-1'>
        username : <input value={input.username} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='username' type="text" placeholder='Email'/>
        email : <input value={input.email} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='email' type="email" placeholder='Email'/>
        password : <input value={input.password} onChange={onchange} className=' outline-none p-1 w-96 border-b-2 border-stone-500' name='password' type="password" placeholder='Password'/>
        <button className=' text-white bg-green-500 py-1 my-2' type='submit'>Register</button>
        <Link to='/login' className=' py-2 text-center text-blue-600'>Already have an account ? Login</Link>
      </form>
    </div>
  )
}

export default Signup