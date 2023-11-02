import { useEffect, useRef, useState } from "react"
import {Link} from 'react-router-dom'
import './Services.css'
import binIcon from '../assets/icons/bin.svg'
import pencilIcon from '../assets/icons/pencil.svg'


const Services = () => {

  const [servicesList, setServicesList] = useState([]);
  const [editName, setEditName] = useState("");
  const [editCost, setEditCost] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editState, setEditState] = useState(false);
  const nameRef = useRef(null);
  const costRef = useRef(null);


  useEffect(()=>{
    try{
        fetch('http://localhost:3000/crabbit/services/getallservices')
        .then((res)=>res.json())
        .then((data)=>{
          setServicesList(data);
        });
      }
    catch(err){
      console.log(err);
    }
  },[servicesList])

//function for adding service
  const addService = ()=>{
    const serviceName = editName;
    const serviceCost = editCost;

    fetch('http://localhost:3000/crabbit/services/newservice',{
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
        alert("Service added successfully");
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
  }

  // function for deleting service
  const deleteService = (_id)=>{

    fetch(`http://localhost:3000/crabbit/services/deleteservice/${_id}`,
    {
      method:"DELETE"
    })
    .then((res)=>{
      
      if(res.ok)
      {
        alert("Service deleted successfully");
      }
      else
      {
        alert("Error in deleting service");
      }
      return res.json()
    }).then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      alert("Error in deleting service");
      console.log(err);
    })
  }

  const handleEdit = (i)=>{
    // setEditState(true)
    // inputRef.current.focus();
    // setEditName(servicesList[i])
    // setEditIndex(i)
  }

  const editService = ()=>{
    // const list = [...servicesList]
    // list[editIndex] = editName;
    // setServicesList(list);
    // setEditIndex(null);
    // setEditState(false);
    // setEditName("")
  }

  const cancelEdit = ()=>{
    // setEditName("")
    // setEditState(false);
  }
  
  const handleInputChange = ()=>{
    setEditName(nameRef.current.value);
    setEditCost(costRef.current.value);
  }


  return (
    <>
    <Link to='/'>Back to home</Link>

    {/* Listing the Services opted by the admin */}

      <div className="services">
        <h1>List of Services</h1>
        <ul className="services-list">
        {
          servicesList.map((service)=>
            (
              <li key={service._id}>{service.serviceName} - {service.serviceCost}</li>
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
            <button onClick={()=>setEditName("")}>Clear</button>
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
                <p>{service.serviceName} - {service.serviceCost}</p>
                <img onClick={()=>handleEdit(service._id)}src={pencilIcon}></img>
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