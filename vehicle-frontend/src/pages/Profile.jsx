import React, { useEffect, useState } from "react";
import { User, Mail, ShieldCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    // if not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    // load saved values
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    setUser({
      name: name || "User",
      email: email || "No Email",
      role: role || "customer"
    });
  }, [navigate]);

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-xl bg-white border border-gray-200 shadow-sm rounded-3xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center">
            <User size={42} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {user.name}
          </h1>

          <p className="text-gray-500 mt-1">
            Your Rentify Account
          </p>
        </div>

        {/* Info */}
        <div className="mt-8 space-y-4">

          {/* Name */}
          <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
            <User className="text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-900">
                {user.name}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
            <Mail className="text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-900">
                {user.email}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
            <ShieldCheck className="text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-semibold text-gray-900 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">

          <button
            onClick={() => navigate("/")}
            className="w-full h-12 rounded-xl border border-gray-300 hover:bg-gray-100 font-medium transition"
          >
            Back to Home
          </button>

          <button
            onClick={handleLogout}
            className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;