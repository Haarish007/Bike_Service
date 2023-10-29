import './App.css'
import bookingIcon from './assets/icons/booking-icon.svg'
import servicesIcon from './assets/icons/services-icon.svg'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
    {/* Listing all the available options for the admin */}
    <div className="home-list">

      <Link to={'/bookings'} className="item">
        <img src={bookingIcon} alt="" />
        <p>Bookings</p>
      </Link>

      <Link to={'/services'} className="item">
        <img src={servicesIcon} alt="" />
        <p>Services</p>
      </Link>

    </div>
    </>
  )
}

export default App
