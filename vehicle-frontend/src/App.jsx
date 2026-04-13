import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import VehicleDetailPage from "./pages/VehicleDetailPage"
import './App.css'
import Navbar from "./components/Navbar"

function App() {
  return(
    <BrowserRouter>
    <Navbar />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
