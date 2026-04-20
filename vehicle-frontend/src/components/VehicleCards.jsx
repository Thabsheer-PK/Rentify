import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  if (!vehicle) return null;

  return (
    <div
      onClick={() => navigate(`/vehicle/${vehicle._id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden 
                 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >

      {/* Image */}
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 text-xs bg-orange-500 text-white px-3 py-1 rounded-full">
          {vehicle.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">

        {/* Title + Price */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {vehicle.name}
          </h3>

          <span className="text-orange-500 font-bold">
            ₹{vehicle.price}
            <span className="text-xs text-gray-500">
              /{vehicle.category === "monthly" ? "month" : "day"}
            </span>
          </span>
        </div>

        {/* Model + Type */}
        <p className="text-sm text-gray-500">
          {vehicle.model} • {vehicle.type}
        </p>

        {/* Location + Rating */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {vehicle.location}
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-3.5 w-3.5 fill-yellow-500" />
            {vehicle.rating}
          </div>
        </div>

      </div>
    </div>
  )
}

export default VehicleCard