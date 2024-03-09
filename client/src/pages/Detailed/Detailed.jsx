import {React, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodo, updateTodo } from '../../features/todo/todoActions';
import { toast } from 'react-toastify';

const Detailed = () => {
  const {id} = useParams(null);
  const {error, todo} = useSelector(state=>state.todo);
  const [changed, setChanged] = useState(false);
  const [tempTodo, setTempTodo] = useState({
    name:"",
    content:""
  });
  const navigate = useNavigate(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getTodo(id))
  },[id])
  const onchange = (e) => {
    setChanged(true);
    const {name, value} = e.target;
    setTempTodo((old_todo)=>{
      return {
        ...old_todo,
        [name]:value
      }
    })
  }
  const update = async()=> {
    dispatch(updateTodo({
      name:tempTodo.name || todo.name,
      content:tempTodo.content || todo.content,
      _id:todo._id
    })).then((res)=>{
      if(res.type == "todo/update/fulfilled"){
        toast.warn("Task Updated")
      }
    })
  }
  const updateStatus = async() => {
    dispatch(updateTodo({
      _id:todo._id,
      status:!todo.status
    })).then((res)=>{
      if(res.type == "todo/update/fulfilled"){
        toast.warn("Task Updated")
      }
    })
  }
  const delete_todo = async()=> {
    dispatch(deleteTodo(todo._id))
    alert('deleted')
    navigate('/')
  }
  const updateActiveStyle = "transition py-1 px-3 bg-blue-600 text-white m-1"
  const updatePassiveStyle = "transition py-1 px-3 bg-gray-500 text-white m-1"
  const statusActiveStyle = "transition py-1 px-3 bg-green-600 text-white"
  const statusPassiveStyle = "transition py-1 px-3 bg-black text-white"
  return (
    <div>
      <Navbar />
      <div className=" p-5">
      {error && error}
        <div className="h1 py-3 text-3xl">{todo && todo.name}</div>
        <form action="" onSubmit={(e)=>{e.preventDefault()}} className=' flex flex-col gap-2 w-7/12'>
          <input type="text" className=' p-1 border-b-2 border-gray-300 bg-gray-200' value={todo && todo._id} disabled name='name' />
          current name : <input type="text" className=' p-1 border-b-2 border-gray-300' value={todo && todo.name} disabled name='name' />
          new name : <input type="text" className=' p-1 border-b-2 border-gray-300' value={tempTodo && tempTodo.name} onChange={onchange} name='name' />
          current content : <input type="text" className=' p-1 border-b-2 border-gray-300' value={todo && todo.content} disabled name='content' />
          new content : <input type="text" className=' p-1 border-b-2 border-gray-300' value={tempTodo && tempTodo.content} onChange={onchange} name='content' />
          <div className="buttons">
          <button onClick={update} className={changed?updateActiveStyle:updatePassiveStyle} disabled={!changed} >update</button>
          <button className={todo && todo.status?statusPassiveStyle:statusActiveStyle} onClick={updateStatus}>{todo && todo.status==true?"incomplete":"complete"}</button>
          <button onClick={delete_todo} className=' py-1 px-3 bg-red-500 text-white m-1' >delete</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Detailed
