import { useEffect, useRef, useState } from "react"
import { Link } from 'react-router-dom'
import './Services.css'
import binIcon from '../assets/icons/bin.svg'
import pencilIcon from '../assets/icons/pencil.svg'


const Services = () => {

  const [servicesList, setServicesList] = useState([]);
  const [editName, setEditName] = useState("");
  const [editCost, setEditCost] = useState(0);
  const [editId, setEditId] = useState("");
  const [editState, setEditState] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const nameRef = useRef(null);
  const costRef = useRef(null);


  const getAllServices = ()=>{
    fetch('http://localhost:3000/bikeservice/services/getallservices')
    .then((res)=>res.json())
    .then((data)=>{
      setServicesList(data);
    })
    .catch((err)=> console.log(err))
  }

  useEffect(()=>{
        fetch('http://localhost:3000/bikeservice/services/getallservices')
        .then((res)=>res.json())
        .then((data)=>{
          setServicesList(data);
        })
        .catch((err)=> console.log(err))

  },[])

//function for adding service
  const addService = ()=>{

    setIsPending(true);

    const serviceName = editName;
    const serviceCost = editCost;

    fetch('http://localhost:3000/bikeservice/services/newservice',{
     method : 'POST',
     headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body : JSON.stringify({
      serviceName,
      serviceCost
    })
    })
    .then((res)=>{
      if(res.ok)
      {
        getAllServices();
        setServicesList(servicesList);
      }
      else
      {
        alert("Error in adding service");
      }
    })
    .catch((err)=>{
      alert("Error in adding service");
      console.log(err);
    })

    setIsPending(false)

  }

  // function for deleting service
  const deleteService = (_id)=>{

    setIsPending(true);

    fetch(`http://localhost:3000/bikeservice/services/deleteservice/${_id}`,
    {
      method:"DELETE"
    })
    .then((res)=>{
      
      if(!res.ok)
      {
        alert("Error in deleting service");
      }
      
      return res.json()
    }).then(()=>{
      getAllServices();
      setServicesList(servicesList);
    })
    .catch((err)=>{
      alert("Error in deleting service");
      console.log(err);
    })

  }

  const handleEdit = (service)=>{
    setEditState(true)
    nameRef.current.focus();
    setEditId(service._id)
    setEditName(service.serviceName)
    setEditCost(service.serviceCost)
    setIsPending(false)

  }

  const editService = ()=>{
    setIsPending(true);

    fetch(`http://localhost:3000/bikeservice/services/editservice/${editId}`,
    {
      method:"PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body : JSON.stringify({
        serviceName : editName,
        serviceCost : editCost
      })
    })
    .then((res)=>{
      
      if(res.ok)
      {
        alert("Service edited successfully");
        getAllServices();
        setServicesList(servicesList);
      }
      else
      {
        alert("Error in editing service");
      }
      return res.json()
    }).then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      alert("Error in editing service");
      console.log(err);
    })
    setEditId("");
    setEditName("")
    setEditCost(0);
    setEditState(false);
    setIsPending(false)
  }

  const cancelEdit = ()=>{
    setEditName("")
    setEditCost(0);
    setEditId("");
    setEditState(false);
  }
  
  const handleInputChange = ()=>{
    setEditName(nameRef.current.value);
    setEditCost(costRef.current.value);
  }


  return (
    <>
    <Link className="back" to='/'>Back to home</Link>

    {/* Listing the Services opted by the admin */}

      <div className="services">
        <h1>List of Services</h1>
        <ul className="services-list">
        {
          servicesList.map((service)=>
            (
              <li key={service._id}>{service.serviceName} - Rs. {service.serviceCost}</li>
            )
            )
        }
        </ul>
        {!servicesList.length && <p>There are no services</p>}
      </div>

      {/* Editing the Services like rename  */}

      <div className="edit-list">
      <h1>Edit Services</h1>
        <div className="edit-service">
            <input ref={nameRef} type="text" value={editName} onChange={handleInputChange}/>
            <input ref={costRef} type='number' value = {editCost} onChange={handleInputChange}/>

            {!editState && 
            <>
            <button onClick={addService}>Add Service</button>
            <button onClick={()=>{
              setEditName("");
              setEditCost(0);
            }}>Clear</button>
            </>
            }

            {editState && 
            <>
            <button onClick={editService}>Apply Changes</button>
            <button onClick={cancelEdit}>Cancel</button>
            </>
            }
            
        </div>

        <div className="services-list">
        {
          servicesList.map((service)=>
            (
              <div key={service._id} className="service">
                <p>{service.serviceName} - Rs. {service.serviceCost}</p>
                <img onClick={()=>handleEdit(service)}src={pencilIcon}></img>
                <img onClick={()=>deleteService(service._id)} src={binIcon}></img>
              </div>
            )
            )
          }
        </div>
      </div>
    </>
  )
}

export default Services