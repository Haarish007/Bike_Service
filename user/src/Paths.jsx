import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Booking from './components/Booking'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'
import { UserContext } from './components/UserContext';


const Paths = () => {
  
    const {user} = useContext(UserContext)

  return (
    <>
    {user && (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="booking" element={<Booking/>}/>
        </Routes>
      )}
      
      {!user && (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
        </Routes>
      )}
    </>
  )
}

export default Paths