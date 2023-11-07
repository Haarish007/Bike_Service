import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Bookings.css'

export const Bookings = () => {

  const [currentBookings, setCurrentBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);

  const getCurrentBookings = ()=>{
    fetch(`http://localhost:3000/bikeservice/bookings/currentbookings/admin`)
    .then((res)=>res.json())
    .then((data)=>{
      setCurrentBookings(data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getCompletedBookings = ()=>{
    fetch(`http://localhost:3000/bikeservice/bookings/completedbookings/admin`)
    .then((res)=>res.json())
    .then((data)=>{
      setCompletedBookings(data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
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

  const handleStatusChange = (bookingId, buttonName) => {
    switch (buttonName) {

      //p - incase of changing the status to pending
      case 'p':
        if(confirm("Do you really need to change the status to pending"))
        {
          fetch(`http://localhost:3000/bikeservice/bookings/changestatus`,{
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body : JSON.stringify({
                bookingId,
                status : "Pending"
              })

          })
          .then((res)=>{
            if(res.ok)
            {
              alert("Status changed successfully");
              getCurrentBookings();
              setCurrentBookings(currentBookings);
            }
            else
            {
              alert("Error in changing status")
            }
          })
          .catch((err)=>{
            alert("Error in changing status");
            console.log(err);
          })
        }
        break;

      // r - incase of changing the status to ready for delivery
      case 'r':
        if(confirm("Do you really need to change the status to Ready for Pickup"))
        {
          fetch(`http://localhost:3000/bikeservice/bookings/changestatus`,{
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body : JSON.stringify({
                bookingId,
                status : "Ready"
              })

          })
          .then((res)=>{
            if(res.ok)
            {
              alert("Status changed successfully");
              getCurrentBookings();
              setCurrentBookings(currentBookings);
            }
            else
            {
              alert("Error in changing status")
            }
          })
          .catch((err)=>{
            alert("Error in changing status");
            console.log(err);
          })
        }
        break;

        //c - incase of changing the status to completed
      case 'c':
        if(confirm("Do you really need to change the status to Completed (once changed cannot be unchanged)"))
        {
          fetch(`http://localhost:3000/bikeservice/bookings/completedbooking/${bookingId}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
          })
          .then((res)=>{
            if(res.ok)
            {
              alert("Status changed successfully");
              getCurrentBookings();
              setCurrentBookings(currentBookings);
              getCompletedBookings();
              setCompletedBookings(completedBookings)
            }
            else
            {
              alert("Error in changing status")
            }
          })
          .catch((err)=>{
            alert("Error in changing status");
            console.log(err);
          })
        }
        break;
      default:
        // Handle unknown button name
        break;
    }
  }

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
                      <td>{new Date(booking.bookingDate).toLocaleDateString('en-US')}</td>
                      <td>{booking.userName}</td>
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
                      <td>
                        <button onClick={()=>handleStatusChange(booking._id, 'p')}>Pending</button>
                        <button onClick={()=>handleStatusChange(booking._id, 'r')}>Ready</button>
                        <button onClick={()=>handleStatusChange(booking._id, 'c')}>Completed</button>
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
                      <td>{new Date(booking.completedDate).toLocaleDateString('en-US')}</td>
                      <td>{booking.userName}</td>
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
export default Bookings