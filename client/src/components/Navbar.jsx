import React, { useContext } from 'react'
import { context } from '../context/context'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {user, setUser} = useContext(context)
  return (
    <div className=' flex justify-between py-2 px-5 border-b-2 border-black'>
      <div className="logo text-2xl">
        Advanced todo
      </div>
      <ul className="list flex items-center">
        <Link to='/' className=' pl-4'>Home</Link>
        <Link to='/profile' className=' pl-4'>Profile</Link>
        <li className=' pl-4'><button className=' bg-red-500 text-white px-3 py-1' onClick={()=>{
          localStorage.removeItem('token')
          setUser(null)
        }}>Logout</button></li>
        <span className='pl-4'>{user && user.username}</span>
      </ul>
    </div>
  )
}

export default Navbar
