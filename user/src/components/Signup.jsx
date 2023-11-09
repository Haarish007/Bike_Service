import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();
  const handleChange = (e)=>{
    const { name, value } = e.target
    switch(name)
    {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'contact':
        setContact(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e)=>{

    e.preventDefault();

    fetch('http://localhost:3000/bikeservice/users/usersignup',{
      method : 'POST',
      headers: {
       "Content-type": "application/json; charset=UTF-8"
     },
     body : JSON.stringify({
      userName: name,
      userEmail: email,
      userPassword: password,
      userContact: contact
     })
     })
     .then((res)=>{
      if(res.ok)
      {
        alert("User Created Successfully");
        navigate('/')
      }
      else if(res.status==409)
      {
        alert("User email is already in use");
      }
      else{
        alert("User Creation failed");
      }
     })
     .catch((err)=>{
      console.log(err);
      alert("User Creation failed")
     })
  }

  return (
    <div>
      <form action="" className="signup">

        <div className="input">
          <p>Name</p>
          <input name='name' type="text" onChange={handleChange}/>
        </div>

        <div className="input">
          <p>Email</p>
          <input name='email' type="email" onChange={handleChange}/>
        </div>

        <div className="input">
          <p>Password</p>
          <input name='password' type="password" onChange={handleChange}/>
        </div>

        <div className="input">
          <p>Contact</p>
          <input name='contact' type="number" onChange={handleChange}/>
        </div>

        <div>
          <button onClick={handleSubmit} type='submit'>Signup</button>
        </div>

      </form>
    </div>
  )
}

export default Signup