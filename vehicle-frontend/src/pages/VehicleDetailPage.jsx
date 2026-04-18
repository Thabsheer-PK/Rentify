import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import vehicles from '../data/vehicle'
import { MapPin, Star, Fuel, Users, Settings, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function VehicleDetailPage() {

  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/vehicles").then((res => res.json())).then((data => setVehicles(data)));
  }, [])

  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === Number(id));

  const [selectedImg, setSelectedImg] = useState(0);
  const navigate = useNavigate();

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  const isDaily = vehicle.category === "daily" || vehicle.category === "event";

  const getVehicleCode = (id) => {
    return `VH-${String(id).padStart(3, "F")}`;
  };

  const message = `Hi, I want to book:
Vehicle Code: ${getVehicleCode(vehicle.id)}
Name: ${vehicle.name}
Location: ${vehicle.location}`;


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all Vehicles
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* Main Image */}
          <div className="rounded-xl overflow-hidden bg-gray-100">
            <img
              src={vehicle.images[selectedImg]}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {vehicle.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImg(i)}
                className={`h-16 w-24 object-cover rounded-lg cursor-pointer border-2 ${i === selectedImg
                  ? "border-orange-500"
                  : "border-gray-200"
                  }`}
              />
            ))}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.name} - {vehicle.model}
            </h1>

            {/* Location + rating */}
            <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {vehicle.location}
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500" />
                {vehicle.rating}
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mt-3">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                {vehicle.category}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {vehicle.type}
              </span>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white shadow-sm rounded-lg p-4">
              <Fuel className="mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">Fuel</p>
              <p className="font-medium">{vehicle.fuel}</p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4">
              <Users className="mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">Seats</p>
              <p className="font-medium">{vehicle.seats}</p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4">
              <Settings className="mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">Transmission</p>
              <p className="font-medium">{vehicle.transmission}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">
              {vehicle.description}
            </p>
          </div>

          {/* Owner Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">
              <a
                href={`https://wa.me/9496421787?text=${encodeURIComponent(message)}`}
                target="_blank"
                className="w-full block text-center border border-green-500 text-green-600 py-3 rounded-lg mt-3 hover:bg-green-50"
              >
                Need help? Chat on WhatsApp
              </a>
            </p>
          </div>

        </div>

        {/* RIGHT (Booking Card) */}
        <div>
          <div className="sticky top-20 bg-white border-gray-600 rounded-xl p-6 shadow-sm ">

            <h2 className="text-lg font-semibold mb-4">Pricing</h2>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                {isDaily ? "Daily Price" : "Monthly Price"}
              </span>

              <span className="text-2xl font-bold text-orange-500">
                ₹{vehicle.price}
                <span className="text-sm text-gray-500 font-normal">
                  {isDaily ? "/day" : "/month"}
                </span>
              </span>
            </div>

            <hr className="my-4" />

            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
              onClick={() => navigate(`/booking/${vehicle.id}`)}
            >
              Book Now
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default VehicleDetailPage