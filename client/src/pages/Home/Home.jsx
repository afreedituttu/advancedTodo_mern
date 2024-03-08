import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import Add from '../../components/Todo/Add'
import List from '../../components/Todo/List';

const Home = () => {
  // const {settodo} = contextHook();
  const [error, setError] = useState();
  // useEffect(()=>{
  //   async function gettodo(){
  //     try{
  //       const {data} = await axios.get(URL+'todo',{
  //         headers:{
  //           "authorization":`Bearer ${localStorage.getItem('token')}`
  //         }
  //       })
  //       settodo(data.todo);
  //     }catch({response}){
  //       setError(response.data.message);
  //     }
  //   };
  //   gettodo();
  // },[])
  return (
    <div>
    <Navbar />
    <div className="p-5">
    {error}
      <span className=' text-center text-2xl text-gray-900 py-3'>TODO'S :</span>
      <div className=" flex justify-between p-3 w-10/12 mx-auto">
        <List editAble={true} />
        <Add />
      </div>
    </div>
    </div>
  )
}

export default Home
