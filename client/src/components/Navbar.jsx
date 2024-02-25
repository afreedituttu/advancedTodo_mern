import React, { useContext } from 'react'
import { context } from '../context/context'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {setUser} = useContext(context)
  const navigate = useNavigate()
  return (
    <div className=' flex justify-between py-2 px-5 border-b-2 border-black'>
      <div className="logo text-2xl">
        Advanced Todo
      </div>
      <ul className="list flex items-center">
        <Link to='/' className=' pl-2'>Home</Link>
        <Link to='/profile' className=' pl-2'>Profile</Link>
        <li className=' pl-2'><button className=' bg-red-500 text-white px-3 py-1' onClick={()=>{
          localStorage.removeItem('token')
          setUser(null)
        }}>Logout</button></li>
      </ul>
    </div>
  )
}

export default Navbar
