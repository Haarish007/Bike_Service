import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Paths from './Paths';
import { UserContext } from './components/UserContext';


function App() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const localData = localStorage.getItem('user')
    if(localData)
    {
      setUser(JSON.parse(localData));
    }
  },[])
  
  return (
    <>
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Paths/>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  )
}

export default App
