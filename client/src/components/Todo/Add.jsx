import React, { useState } from 'react'
import { URL } from '../../constants'
import axios from 'axios'
import contextHook from '../../Hooks/contextHook';
import { addTodo } from '../../features/todo/todoActions';
import { useDispatch } from 'react-redux';

const Add = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name:"",
    content:""
  })
  const onchange = (e)=> {
    setInput((old_input)=>{
      const {name, value} = e.target;
      return{
        ...old_input,
        [name]:value
      }
    })
  }
  const [message, setMessage] = useState();
  const add = async()=> {
    dispatch(addTodo(input)).then((res)=>{
      if(res.type == 'todo/add/fulfilled'){
        setMessage('Task added')
        setTimeout(()=>{
          setMessage();
          setInput({
            name:"",
            content:""
          })
        },1000)
      }
    })
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
