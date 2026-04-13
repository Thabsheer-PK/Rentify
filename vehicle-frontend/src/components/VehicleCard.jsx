import React from 'react'
import vehicles from '../data/vehicle'
import './css/VehicleCard.css'
import {useNavigate} from 'react-router-dom'

function VehicleCard() {
  const navigate = useNavigate();

  return (
    <div className='container'>
      {
        vehicles.map((v) => {
          return (
            <div key={v.id} className='card' onClick={()=>navigate(`/vehicle/${v.id}`)}>
              <img
                src={v.image} alt={v.name}
              />
              <div className="card-body">
                <h3>{v.name}</h3>
                <p>Model: {v.model}</p>
                <p>Location: {v.location}</p>

                <p className='category'>
                  Category: {v.category}
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
