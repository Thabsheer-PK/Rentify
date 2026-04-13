import React from "react";
import "./css/Navbar.css";
import logo from "../assets/vehicle-images/logo5.svg";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      {/* Left */}
      <div className="logo" onClick={()=>navigate('/')}>
        <div className="logo-icon">
          <img src={logo} alt="logo" />
        </div>
        <span className="logo-text">Rentify</span>
      </div>

      {/* Right */}
      <div className="nav-actions">
        <button className="login-btn">
          <User size={16} />
          Login
        </button>

        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;