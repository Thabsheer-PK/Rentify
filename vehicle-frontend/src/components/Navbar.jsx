import React from "react";
import logo from "../assets/vehicle-images/logo5.svg";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer"
      >
        <div className="h-10 flex items-center">
          <img src={logo} alt="logo" className="h-7 w-auto" />
        </div>
        <span className="ml-2 text-[22px] font-semibold text-gray-900">
          Rentify
        </span>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-3">
        
        {/* Login */}
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-300 bg-white rounded-lg cursor-pointer transition hover:bg-gray-100">
          <User size={16} />
          Login
        </button>

        {/* Signup */}
        <button className="px-4 py-1.5 bg-orange-500 text-white rounded-lg font-medium transition hover:bg-orange-600">
          Sign Up
        </button>

      </div>
    </nav>
  );
}

export default Navbar;