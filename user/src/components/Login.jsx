import { useState } from 'react'
import './Login.css'
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {user, setUser} = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = ()=>{
    fetch('http://localhost:3000/bikeservice/users/userlogin',
    {
        method : 'POST',
        headers: {
         "Content-type": "application/json; charset=UTF-8"
       },
       body : JSON.stringify({
        userEmail : email,
        userPassword: password
       })
    })
    .then((res)=>res.json())
    .then((data)=>{
      setUser(data);
      localStorage.setItem('user',JSON.stringify(data));
      navigate('/');
    })
  }

  const handleChange = (e)=>{
    const {name, value} = e.target;
    switch(name){
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }
  return (
    <div className="login"> 
      <form className="login-form"> 
        <label className="form-label" htmlFor="email">Email</label> 
        <input className="form-input" name="email" type="text" onChange={handleChange} /> 
        <label className="form-label" htmlFor="password">Password</label> 
        <input className="form-input" name="password" type="password" onChange={handleChange} /> 
        <button className="form-button" type='button' onClick={handleSubmit}>Login</button> 
      </form>
    </div>
  )
}

export default Login