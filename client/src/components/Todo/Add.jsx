import React, { useState } from 'react'
import { addTodo } from '../../features/todo/todoActions';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify'

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
  const add = async()=> {
    dispatch(addTodo(input)).then((res)=>{
      if(res.type == 'todo/add/fulfilled'){
        toast.success("Task Added");
        setTimeout(()=>{
          setInput({
            name:"",
            content:""
          })
        },1000)
      }
    })
  }
  return (
    <div className=' p-2 bg-slate-300 m-1 h-3/5'>
      <form onSubmit={(e)=>{e.preventDefault()}} className=' flex flex-col'>
        name : <input onChange={onchange} className=' p-1' value={input.name} type="text" name='name'/>
        content : <textarea cols="30" rows="10" onChange={onchange} className=' p-1' value={input.content} type="text" name='content'/>
        <button onClick={add} className='my-2 px-3 py-1 bg-green-500 text-white'>Add</button>
      </form>
    </div>
  )
}

export default Add
