import React from 'react'
import VehicleCard from "../components/VehicleCards";
import heroBg from '../assets/vehicle-images/hero-bg.jpg'
import HeroSearch from '../components/HeroSearch'
// import vehicle from '../data/vehicle'
import { useEffect, useState } from 'react';



function Home() {


  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/vehicles").then((res => res.json())).then((data => setVehicles(data)))
  }, [])
  return (
    <div>

      <section className="relative h-[90vh] flex items-center">

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


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>

    </div>
  )
}

export default Home