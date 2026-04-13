import React from 'react'
import { useParams } from 'react-router-dom'
import vehicles from '../data/vehicle';
import './css/VehicleDetailPage.css'

function VehicleDetailPage() {
  const { id } = useParams();

  const vehicle = vehicles.find((v) => v.id == Number(id));

  if (!vehicle) return <h2>Vehicle Not Found</h2>
  return (
    <div className="detail-container">
      <div className="detail-card">
        <img src={vehicle.image} alt={vehicle.name} />

        <div className="detail-info">
          <h2>{vehicle.name}</h2>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Location:</strong> {vehicle.location}</p>
          <p><strong>Category:</strong> {vehicle.category}</p>
          <p className="price">₹{vehicle.price}</p>

          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetailPage
