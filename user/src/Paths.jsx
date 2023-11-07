import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Booking from './components/Booking'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'
import { UserContext } from './components/UserContext';
import MyBookings from './components/MyBookings';


const Paths = () => {
  
    const {user} = useContext(UserContext)

  return (
    <>
    {user && (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="booking" element={<Booking/>}/>
          <Route path="mybookings" element={<MyBookings/>}></Route>
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