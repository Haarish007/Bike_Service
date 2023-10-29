import { useRef, useState } from "react"
import {Link} from 'react-router-dom'
import './Services.css'
import binIcon from '../assets/icons/bin.svg'
import pencilIcon from '../assets/icons/pencil.svg'


const Services = () => {

  const defaultList = ['General Service Checkup','Oil change','Water wash']
  const [servicesList, setServicesList] = useState(defaultList);
  const [editName, setEditName] = useState("")
  const [editIndex, setEditIndex] = useState(null);
  const [editState, setEditState] = useState(false)
  const inputRef = useRef(null);

  const addService = ()=>{
    setServicesList((prev)=>[...prev,editName])
    setEditName("")
  }

  const deleteService = (i)=>{
    const newServiceList = servicesList.filter((service)=>{
      if(i != servicesList.indexOf(service))
      {
        return(service)
      }
    })
    setServicesList(newServiceList)
  }

  const handleEdit = (i)=>{
    setEditState(true)
    inputRef.current.focus();
    setEditName(servicesList[i])
    setEditIndex(i)
  }

  const editService = ()=>{
    const list = [...servicesList]
    list[editIndex] = editName;
    setServicesList(list);
    setEditIndex(null);
    setEditState(false);
    setEditName("")
  }

  const cancelEdit = ()=>{
    setEditName("")
    setEditState(false);
  }
  
  const handleInputChange = (e)=>{
    setEditName(e.target.value)
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
              <li key={service}>{service}</li>
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
            <input ref={inputRef} type="text" value={editName} onChange={handleInputChange}/>
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
          servicesList.map((service, i)=>
            (
              <div key={i} className="service">
                <p>{service}</p>
                <img onClick={()=>handleEdit(i)}src={pencilIcon}></img>
                <img onClick={()=>deleteService(i)} src={binIcon}></img>
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