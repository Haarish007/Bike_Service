import { useState } from "react"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import './Booking.css'
import { useContext } from "react"
import { UserContext } from "./UserContext"

const Booking = () => {
    const { user } = useContext(UserContext)
    const [services, setServices] = useState([]);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [date, setDate] = useState('');
    const [selectedServices, setSelectedServices] = useState([])
    const [totalCost, setTotalCost] = useState(0);

    useEffect(()=>{
        fetch("http://localhost:3000/bikeservice/services/getallservices")
        .then((res)=> res.json())
        .then((data)=>{
            setServices(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const handleInputChange = (e)=>{
        const {name, value} = e.target;

        switch(name){
            case "make":
                setMake(value)
                break;

            case "model":
                setModel(value);
                break;

            case "date": 
                setDate(value);
                break;

            default:
                break;
        }        
    }

      

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch('http://localhost:3000/bikeservice/bookings/newbooking',{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body : JSON.stringify({
                userId: user._id,
                bikeMake: make,
                bikeModel: model,
                bookingDate : date,
                selectedServices: selectedServices,
                totalCost: totalCost,
              })
        })
        .then((res)=>{
            if(res.ok)
            {
                alert("Booking Completed");
            }
            else{
                alert("Booking unsuccessful")
            }
        })
    }

    const handleCheckboxChange = (e, service) => {
        const { value, checked } = e.target;
        const cost = service.serviceCost;
        setSelectedServices((prev) => {
            if (checked) 
            {
                setTotalCost((prev)=> prev + cost)
                return [...prev, value];
            } 
            else 
            {
                setTotalCost((prev)=> prev - cost)
                return prev.filter((service) => service !== value);
            }
        })
    }
    
  return (
    <div className="booking">
        <Link className='back' to='/'>Back to Home</Link>
        <form action="" className="booking-form">
            <div htmlFor="">
                <h2>Username (cannot be changed)</h2>
                <input type="text" value={user.userName} readOnly />
            </div>

            <div>
                <h2>Make name</h2>
                <input name="make" value={make} onChange={handleInputChange} type="text" required/>
            </div>

            <div>
                <h2>Model name</h2>
                <input name="model" value={model} onChange={handleInputChange} type="text" required/>
            </div>

            <div>
                <h2>Date</h2>
                <input name="date" value={date} onChange={handleInputChange} type="date" required />
            </div>

            <div>
                <h2>Services</h2>

                {services.map((service) => (
                    <label key={service._id}>

                    <input
                        type ="checkbox"
                        name ="service"
                        value = {service.serviceName}
                        onChange = {(e)=> handleCheckboxChange(e, service)}
                    />

                    {service.serviceName}
                    </label>
                ))}

            </div>

            <div>
                <h2>Total cost</h2>
                <p>{totalCost}</p>
            </div>
            
            <button onClick={handleSubmit} type="submit">Book Service</button>
        </form>

    </div>
  )
}

export default Booking