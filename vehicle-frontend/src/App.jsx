import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import VehicleDetailPage from "./pages/VehicleDetailPage"
import './App.css'
import Navbar from "./components/Navbar"
import FilteredVehicles from "./pages/FilteredVehicles"
import BookVehiclePage from "./pages/BookVehiclePage"
import BookingSuccessPage from "./pages/BookingSuccessPage"
import AddVehiclePage from "./pages/AddVehiclePage"

function App() {
  return(
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
      <Route path="/vehicles" element={<FilteredVehicles />}/>
      <Route path="/booking/:id" element={<BookVehiclePage/>}/>
      <Route path="/booking-success" element={<BookingSuccessPage/>} />
      <Route path="/add-vehicle" element={<AddVehiclePage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
