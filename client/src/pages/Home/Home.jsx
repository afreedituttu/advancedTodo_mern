import React, { useContext } from 'react'
import { context } from '../../context/context'
import Navbar from '../../components/Navbar';

const Home = () => {
  const {setUser} = useContext(context);
  return (
    <div>
    <Navbar />
      home
      <button onClick={()=>{
        setUser({})
        localStorage.removeItem('token')
      }}>Logout</button>
      <br />
    </div>
  )
}

export default Home
