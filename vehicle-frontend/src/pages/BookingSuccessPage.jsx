import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingSuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(true);

  const message = state?.message || "";
  const vehicleName = state?.vehicleName || "Vehicle";

  const whatsappLink = `https://wa.me/9496421787?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000)
    return (() => clearTimeout(timer))
  }, [])

  // 👇 Show loader first
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your booking...</p>
        </div>
      </div>
    );
  }

  // 👇 Show actual page after loading
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">

        <div className="text-green-500 text-5xl mb-4">✅</div>

        <h1 className="text-xl font-bold mb-2">
          Booking Request Sent!
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          Your request for <span className="font-medium">{vehicleName}</span> has been received.
          <br />
          Our team will contact you shortly.
        </p>

        <div className="space-y-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Chat on WhatsApp
          </a>

          <button
            onClick={() => navigate("/")}
            className="w-full border py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessPage;