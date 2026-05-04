import React from 'react'
import VehicleCard from "../components/VehicleCards";
import heroBg from '../assets/logos/hero-bg.jpg'
import HeroSearch from '../components/HeroSearch'
// import vehicle from '../data/vehicle'
import { useEffect, useState } from 'react';
import { Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



function Home() {

  const navigate = useNavigate();
  const {user} = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("https://rentify-le72.onrender.com")

        if (!res.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await res.json();
        setVehicles(data);

      } catch (error) {
        console.error(error)
        setError("Unable to fetch vehicles")
      } finally {
        setLoading(false)
      }
    }
    fetchVehicles();
  }, [])



  return (
    <div>
      <section className="relative h-[92vh] flex items-center">

        {/* Background Image */}
        <img
          src={heroBg}
          alt="Kerala road"
          className="absolute w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-6 w-full">

          {/* Text */}
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Rent a Vehicle in Kerala, <br />
              <span className="text-orange-500">Hassle-Free</span>
            </h1>

            <p className="mt-4 text-lg text-gray-300">
              Browse vehicles from trusted local shops and individual owners.
              Daily, monthly, or wedding rentals.
            </p>
          </div>

          <div className="mt-8 max-w-4xl"><HeroSearch /></div>

        </div>
      </section>

      {loading && <p className='text-center mt-10'>Loading vehicles...</p>}
      {error && <p className='text-center mt-10 text-red-500'>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">

        {vehicles.map((v) => (
          <VehicleCard key={v._id} vehicle={v} />
        ))}
      </div>
      <div className="bg-blue-900 mt-2">
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl text-white">Own a vehicle? Start earning today!</h2>
          <p className="mx-auto mt-3 max-w-md text-white ">
            List your vehicle on DriveKerala and earn money. Shops and individuals welcome.
          </p>

          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
                return;
              }
              if (user.role !== "provider") {
                alert("Only providers can add vehicles");
                return;
              }
              navigate("/add-vehicle");


            }}
            className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-2xl cursor-pointer group">
            List Your Vehicle — It's Free
          </button>


        </div>

      </div>
    </div>


  )
}

export default Home