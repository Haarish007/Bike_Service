import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


export const Bookings = () => {

  const [currentBookings, setCurrentBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:3000/bikeservice/bookings/completedbookings/admin`)
    .then((res)=>res.json())
    .then((data)=>{
      setCompletedBookings(data);
    })
    .catch((err)=>{
      console.log(err)
    })

    fetch(`http://localhost:3000/bikeservice/bookings/currentbookings/admin`)
    .then((res)=>res.json())
    .then((data)=>{
      setCurrentBookings(data);      
    })
    .catch((err)=>{
      console.log(err)
    })

  },[])

  const handleStatusChange = ()=>{
    
  }

  return (
    <div>
          <Link to='/'>Back to home</Link>

          {/* current Bookings */}
          <div className="current-bookings">
            <h1>Current Bookings</h1>
            <table>
              <thead>
                <tr>
                  <th>Booking date</th>
                  <th>Name</th>
                  <th>Bike Make</th>
                  <th>Model</th>
                  <th>Services</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Change Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentBookings.map((booking)=>(
          
                    <tr key={booking._id}>
                      <td>{booking.bookingDate}</td>
                      <td>{booking.userName}</td>
                      <td>{booking.bikeMake}</td>
                      <td>{booking.bikeModel}</td>
                      <td>{booking.selectedServices}</td>
                      <td>{booking.totalCost}</td>
                      <td>{booking.status}</td>
                      <td>
                        <button onChange={handleStatusChange}>b</button>
                        <button onChange={handleStatusChange}>ip</button>
                        <button onChange={handleStatusChange}>c</button>
                      </td>
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
                  <th>Name</th>
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
                      <td>{booking.bookingDate}</td>
                      <td>{booking.userName}</td>
                      <td>{booking.bikeMake}</td>
                      <td>{booking.bikeModel}</td>
                      <td>{booking.selectedServices}</td>
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
export default Bookings