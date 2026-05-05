import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  console.log("user in nav", user)
  return (
    <nav className="flex justify-between items-center px-5 md:px-8 py-3 
bg-white/70 backdrop-blur-md 
border-b border-white/20 
sticky top-0 z-50">

      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer select-none"
      >
        <h1 className="relative text-[22px] md:text-[24px] font-semibold tracking-tight text-gray-900 group transition-all duration-300">

          <span className="font-bold">Rent</span>
          <span className="text-orange-500 font-bold">ify</span>

          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 rounded-full transition-all duration-300 group-hover:w-12"></span>
        </h1>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-3">

        {/* If NOT logged in */}
        {!user ? (
          <>
            {/* Login */}
            <button
              className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-300 bg-white rounded-lg cursor-pointer transition hover:bg-gray-100"
              onClick={() => navigate("/login")}
            >
              <User size={16} />
              Login
            </button>

            {/* Signup */}
            <button
              className="px-4 py-1.5 bg-orange-500 text-white rounded-lg font-medium transition hover:bg-orange-600"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        ) : (
          /* If logged in */
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
              <User size={16} />
            </div>

            <span className="font-medium text-gray-800">
              {user.name}
            </span>
          </button>
        )}
      </div>

      <button className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {
          isOpen ? "X" : "☰"
        }

      </button>

      <div
        className={`fixed right-0 top-14 z-40 bg-white shadow-lg rounded-2xl rounded-tr-none rounded-br-none
  w-56 p-4 flex flex-col gap-4
  transform transition-all duration-300 ease-in-out
  ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}`}
      >

        {!user ? (
          <>
            <button
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
              className="text-left hover:text-orange-500 transition"
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate("/signup");
                setIsOpen(false);
              }}
              className="text-left hover:text-orange-500 transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
            className="text-left hover:text-orange-500 transition"
          >
            {user.name}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;