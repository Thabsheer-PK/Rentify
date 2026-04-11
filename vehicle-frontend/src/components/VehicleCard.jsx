import React from 'react'
import vehicles from '../data/vehicle'
import './VehicleCard.css'

function VehicleCard() {
  return (
    <div className='container'>
      {
        vehicles.map((v) => {
          return (
            <div key={v.id} className='card'>
              <img
                src={v.image} alt={v.name}
              />
              <div className="card-body">
                <h3>{v.name}</h3>
                <p>Model: {v.model}</p>
                <p>Location: {v.location}</p>

                <p className='category'>
                  Category: {Array.isArray(v.category) ? 'Daily or Monthly' : v.category}
                </p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default VehicleCard
