import "./index.css"
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Private from './components/Routes/Private'
import Profile from './pages/Profile/Profile'
import Home from './pages/Home/Home'
import Detailed from './pages/Detailed/Detailed'

const App = () => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Private />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/details/:id' element={<Detailed />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<p>Not found</p>} />
      </Routes>
    </div>
  )
}

export default App
