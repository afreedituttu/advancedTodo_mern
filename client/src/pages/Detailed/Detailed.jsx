import {React, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import { URL } from '../../constants';
import axios from 'axios';

const Detailed = () => {
  const {id} = useParams(null);
  const [todo, setTodo] = useState([]);
  const [message, setMessage] = useState(null);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate(null);

  useEffect(()=>{
    async function getTodo(){
      try{
        const {data} = await axios.get(URL+`/todo/${id}`,{
          headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        setTodo(data.todo);
      }catch({response}){
        setMessage(response.data.message);
      }
    }
    getTodo();
  },[])
  const onchange = (e) => {
    setChanged(true);
    const {name, value} = e.target;
    setTodo((old_todo)=>{
      return {
        ...old_todo,
        [name]:value
      }
    })
  }
  const update = async()=> {
    try{
      const {data} = await axios.put(URL+`/todo`, {
        name:todo.name,
        content:todo.content,
        status:todo.status,
        id:todo._id
      }, {
        headers:{
          'authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      setMessage("Updated successfully");
      setChanged(false)
    }catch({response}){
      setMessage(response.data.message);
    }
  }
  const delete_todo = async()=> {
    try{
      const {data} = await axios.delete(URL+'todo/'+id,{
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      setMessage("Deleted")
      setTimeout(()=>{
        navigate('/')
      },2000)
    }catch({response}){
      setMessage(response.data.message);
    }
  }
  const updateActiveStyle = "transition py-1 px-3 bg-blue-600 text-white m-1"
  const updatePassiveStyle = "transition py-1 px-3 bg-gray-500 text-white m-1"
  const statusActiveStyle = "transition py-1 px-3 bg-green-600 text-white"
  const statusPassiveStyle = "transition py-1 px-3 bg-black text-white"
  return (
    <div>
      <Navbar />
      <div className=" p-5">
      {message}
        <div className="h1 py-3 text-3xl">{todo && todo.name}</div>
        <form action="" onSubmit={(e)=>{e.preventDefault()}} className=' flex flex-col gap-2 w-7/12'>
          <input type="text" className=' p-1 border-b-2 border-gray-300 bg-gray-200' value={todo && todo._id} disabled name='name' />
          <input type="text" className=' p-1 border-b-2 border-gray-300' value={todo && todo.name} onChange={onchange} name='name' />
          <input type="text" className=' p-1 border-b-2 border-gray-300' value={todo && todo.content} onChange={onchange} name='content' />
          <div className="buttons">
          <button onClick={update} className={changed?updateActiveStyle:updatePassiveStyle} disabled={!changed} >update</button>
          <button className={todo && todo.status?statusPassiveStyle:statusActiveStyle} onClick={()=>{
            setTodo(()=>{
              setChanged(true);
              return {
                ...todo,
                "status":!todo.status
              }
            })
          }}>{todo && todo.status==true?"incomplete":"complete"}</button>
          <button onClick={delete_todo} className=' py-1 px-3 bg-red-500 text-white m-1' >delete</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Detailed
