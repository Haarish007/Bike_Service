import App from "./App";
import {Routes, Route} from "react-router-dom"
import Bookings from "./components/Bookings"
import Services from './components/Services'

const Paths = ()=>{

    return(
        <>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/bookings" element={<Bookings/>}/>
                <Route path="/services" element={<Services/>}/>
            </Routes>
        </>
    )
}

export default Paths;