import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import './MyBookings.css'

const MyBookings = () => {

    const { user } = useContext(UserContext)
    const [currentBookings, setCurrentBookings] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);

    useEffect(()=>{
      fetch(`http://localhost:3000/bikeservice/bookings/completedbookings/user/${user._id}`)
      .then((res)=>res.json())
      .then((data)=>{
        setCompletedBookings(data);
      })
      .catch((err)=>{
        console.log(err)
      })
  
      fetch(`http://localhost:3000/bikeservice/bookings/currentbookings/user/${user._id}`)
      .then((res)=>res.json())
      .then((data)=>{
        setCurrentBookings(data);      
      })
      .catch((err)=>{
        console.log(err)
      })
  
    },[])

    return (
        <div>
              <Link className='back' to='/'>Back to home</Link>
    
              {/* current Bookings */}
              <div className="current-bookings">
                <h1>Current Bookings</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Booking date</th>
                      <th>Bike Make</th>
                      <th>Model</th>
                      <th>Services</th>
                      <th>Cost</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentBookings.map((booking)=>(
              
                        <tr key={booking._id}>
                          <td>{new Date(booking.bookingDate).toLocaleDateString('en-US')}</td>
                          <td>{booking.bikeMake}</td>
                          <td>{booking.bikeModel}</td>
                          <td>
                            <ul>
                              {booking.selectedServices.map((service, index) => (
                                <li key={index}>{service}</li>
                              ))}
                            </ul>
                          </td>
    
                          <td>{booking.totalCost}</td>
                          <td>{booking.status}</td>
                        </tr>
              
                      ))
                    }
                  </tbody>
                </table>
              </div>
    
              {/* Completed Bookings */}
              <div className="completed-bookings">
                <h1>Completed Bookings</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Booking date</th>
                      <th>Bike Make</th>
                      <th>Model</th>
                      <th>Services</th>
                      <th>Cost</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      completedBookings.map((booking)=>(
                        
                        <tr key={booking._id}>
                          <td>{new Date(booking.completedDate).toLocaleDateString('en-US')}</td>
                          <td>{booking.bikeMake}</td>
                          <td>{booking.bikeModel}</td>
                          <td>
                            <ul>
                            {booking.services.map((service, index) => (
                                <li key={index}>{service}</li>
                            ))}
                            </ul>
                          </td>                          
                          <td>{booking.totalCost}</td>
                          <td>{booking.status}</td>
                        </tr>
                        
                      ))
                    }
                  </tbody>
                </table>
              </div>
        </div>
      )
}

export default MyBookings