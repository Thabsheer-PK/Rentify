import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import VehicleDetailPage from "./pages/VehicleDetailPage"
import './App.css'
import Navbar from "./components/Navbar"
import FilteredVehicles from "./pages/FilteredVehicles"
import BookVehiclePage from "./pages/BookVehiclePage"

function App() {
  return(
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
      <Route path="/vehicles" element={<FilteredVehicles />}/>
      <Route  path="/booking/:id" element={<BookVehiclePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
