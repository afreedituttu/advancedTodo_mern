import React, { useState } from 'react'
import { URL } from '../../constants'
import axios from 'axios'
import contextHook from '../../Hooks/contextHook';

const Add = () => {
  const {setTodo} = contextHook();
  const [input, setInput] = useState({
    name:"",
    content:""
  })
  const [message, setMessage] = useState();
  const onchange = (e)=> {
    setInput((old_input)=>{
      const {name, value} = e.target;
      return{
        ...old_input,
        [name]:value
      }
    })
  }
  const add = async()=> {
    try{
      const {data} = await axios.post(URL+'/todo',{
        name:input.name,
        content:input.content
      },{
        headers:{
          "authorization":`Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodo((old_todo)=>{
        return[
          ...old_todo,
          data.todo
        ]
      })
      setMessage("Task Added");
      setTimeout(()=>{
        setMessage();
        setInput({
          name:"",
          content:""
        })
      },3000)
    }catch({response}){
      setMessage(response.data.message)
    }
  }
  return (
    <div className=' p-2 bg-slate-300 w-1/3'>
    {message}
      <form onSubmit={(e)=>{e.preventDefault()}} className=' flex flex-col'>
        name : <input onChange={onchange} className=' p-1' value={input.name} type="text" name='name'/>
        content : <input onChange={onchange} className=' p-1' value={input.content} type="text" name='content'/>
        <button onClick={add} className='my-2 px-3 py-1 bg-green-500 text-white'>Add</button>
      </form>
    </div>
  )
}

export default Add
