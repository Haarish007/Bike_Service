import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import './Home.css'
const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.setItem('user',null)
    setUser(null);
    navigate('/');
  }
  return (
    <div className="home"> 
      {user && (
        <div className="home-content"> 
          <p>Hello {user.userName}</p>
          <Link to='/booking' className="link">New Booking</Link> 
          <Link to='/mybookings' className="link">My Bookings</Link> 
          <button onClick={logout} className="link">Logout</button> 
        </div>
      )}
      {!user && (
        <div className="home-content"> 
          <Link to='/login' className="link">Login</Link> 
          <Link to='/signup' className="link">Signup</Link> 
        </div>
      )}
    </div>
  )
}

export default Home