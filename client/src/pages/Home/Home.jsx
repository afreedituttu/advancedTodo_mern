import Navbar from '../../components/Navbar';
import Add from '../../components/Todo/Add'
import List from '../../components/Todo/List';


const Home = () => {
  return (
    <div>
    <Navbar />
    <div className="p-5">
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
