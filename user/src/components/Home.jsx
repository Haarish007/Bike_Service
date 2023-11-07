import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import Booking from './Booking'

const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.setItem('user',null)
    setUser(null);
    navigate('/');
  }
  return (
    <div>
      {user && (
        <>
          <p>Hello {user.userName}</p>
          <Link to='/booking'>Booking</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!user && (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </>
      )}
  
    </div>
  )
}

export default Home