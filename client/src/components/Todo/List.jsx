import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteTodo, getAllTodo } from '../../features/todo/todoActions'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'

const List = ({editAble}) => {
    const {todos, error} = useSelector(state=>state.todo)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getAllTodo());
    },[])
    const delete_todo = async(id)=> {
      dispatch(deleteTodo(id)).then((res)=>{
        if(res.type == 'todo/delete/fulfilled'){
          toast.error("Task Deleted")
        }
      })
    }
  return (
    <div>
    {error}
      <table className='table'>
        <thead className=''>
          <tr>
              <th className=' px-4 py-2'>index</th>
              <th>name</th>
              <th>status</th>
              <th>operations</th>
          </tr>
        </thead>
        <tbody className=''>
          {todos.map((data, index)=>{
            return(<tr key={index}>
              <td className=' px-4 py-2'>{index+1}</td>
              <td className=' px-4 py-2'>{data.name}</td>
              <td className=' px-4 py-2'>{data.status?"completed":"not completed"}</td>
              <td className=' px-4 py-2'><Link to={`/details/${data._id}`} ><button className=' px-3 py-1 bg-blue-500 text-white m-1'>view</button></Link>{editAble?(<button onClick={()=>{delete_todo(data._id)}} className=' px-3 py-1 bg-red-500 text-white m-1'>delete</button>):""}</td>
          </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default List
