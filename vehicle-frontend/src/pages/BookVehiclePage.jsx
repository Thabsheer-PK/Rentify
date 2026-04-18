import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

function BookVehiclePage() {
  const [vehicles , setVehicles] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/api/vehicles").then((res => res.json())).then((data => setVehicles(data)))
  },[])
  
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find(v => String(v.id) === id);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [months, setMonths] = useState(1);
  const today = new Date().toISOString().split("T")[0];
  const isInvalidDate = fromDate && toDate && new Date(toDate) < new Date(fromDate);

  if (!vehicle) {
    return <p className="text-center mt-10">Vehicle not found</p>;
  }

  const isDaily = vehicle.category === "daily" || vehicle.category === "event";
  const isMonthly = vehicle.category === "monthly";
  const getToDateFromMonths = () => {
    if (!fromDate || !months) return "";

    const start = new Date(fromDate);
    const newDate = new Date(start);

    newDate.setMonth(start.getMonth() + Number(months));

    return newDate.toISOString().split("T")[0];
  };

  const calculatedToDate = isMonthly ? getToDateFromMonths() : toDate;

  // 🔥 Calculate days
  const getDays = () => {
    if (!fromDate || !toDate) return 0;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diff = (end - start) / (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 1;
  };
  const days = getDays() ;

  // 🔥 Price calculation
  const basePrice = isDaily
    ? vehicle.price * days
    : isMonthly
      ? vehicle.price * months
      : vehicle.price;
  const deliveryCharge = delivery ? 500 : 0;
  const total = basePrice + deliveryCharge;

  const handleBooking = () => {
    if (!name || !phone || !fromDate || (isDaily && !toDate)) {
      alert("Please fill all fields");
      return;
    }

    const getVehicleCode = (id) => {
      return `VH-${String(id).padStart(3, "F")}`;
    };

    const message = `Booking Request : --

Vehicle: ${vehicle.name}
ID: ${getVehicleCode(vehicle.id)}

Name: ${name}
Phone: ${phone}

From: ${fromDate}
To: ${calculatedToDate}
${isDaily ? `Days: ${days}` : `Months: ${months}`}

Delivery: ${delivery ? "Yes (+₹500)" : "No"}

Total: ₹${total}
`;

     navigate("/booking-success", {
      state: {
        message,
        vehicleName: vehicle.name
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to vehicle
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        Book: {vehicle.name}
      </h1>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">

        {/* Name + Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Your Name *</label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* FROM DATE */}
          <div>
            <label className="text-sm font-medium">From Date</label>
            <input
              type="date"
              min={today}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>

          {/* CONDITIONAL UI */}
          {isDaily ? (
            <div>
              <label className="text-sm font-medium">To Date</label>
              <input
                type="date"
                min={fromDate || today}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              />
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium">Number of Months</label>
              <select
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              >
                {[1, 2, 3, 6, 12].map(m => (
                  <option key={m} value={m}>{m} month{m > 1 && "s"}</option>
                ))}
              </select>
            </div>
          )}

        </div>
        {isMonthly && fromDate && (
          <p className="text-sm text-gray-500">
            To Date: {calculatedToDate}
          </p>
        )}

        {/* Delivery Option */}
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <p className="font-medium">Vehicle Delivery</p>
            <p className="text-sm text-gray-500">
              Get vehicle delivered to your location (+ ₹500)
            </p>
          </div>
      
          <input
            disabled={!fromDate || !toDate}
            type="checkbox"
            checked={delivery}
            onChange={() => setDelivery(!delivery)}
            className="h-5 w-5"
          />
        </div>

        {/* Price Summary */}
        <div className="border rounded-lg p-4 space-y-3">

          {/* Per Day */}
          {isDaily && (
            <div className="flex justify-between text-sm">
              <span>Price per day</span>
              <span>₹{vehicle.price}</span>
            </div>
          )}

          {/* Days */}
          {isDaily && days > 0 && (
            <div className="flex justify-between text-sm">
              <span>Total days</span>
              <span>{days} day{days > 1 && "s"}</span>
            </div>
          )}

          {/* Base */}
          <div className="flex justify-between text-sm">
            <span>Base Price</span>
            <span>₹{basePrice || 0}</span>
          </div>

          {/* Delivery */}
          {delivery && (
            <div className="flex justify-between text-sm">
              <span>Delivery Charge</span>
              <span>₹500</span>
            </div>
          )}

          <hr />

          {/* Total */}
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span className="text-orange-500">₹{total || vehicle.price}</span>
          </div>

        </div>
        {/* Button */}
        <button
          onClick={handleBooking}
          disabled={!name || !fromDate || (isDaily && !toDate) || isInvalidDate}
          className={`w-full py-3 rounded-lg font-medium ${!name || !fromDate || (isDaily && !toDate) || isInvalidDate
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
}

export default BookVehiclePage;