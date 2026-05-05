import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })

    setError(prev =>({
      ...prev,
      [e.target.name] : ""
    }))
  };
  const validate = () =>{
    const newErrors = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/
    if(!form.email){
      newErrors.email = "Email is required";
    }else if(!emailRegex.test(form.email)){
      newErrors.email = "Please Enter valid Email";
    }

    setError(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validate()) return ;
    setLoading(true);

    try {
      const res = await fetch("https://rentify-le72.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      console.log("step 1, fetching completed")
      const data = await res.json();
      console.log("step 2, data is ", data)

      if (!res.ok) {
        console.log("step 3, res is not ok")
        setServerError(data.message || "Login failed");
        setLoading(false);
        return;
      }
      console.log("step 4, before login")

      // ✅ USE CONTEXT
      login({
        token: data.token,
        name: data.user?.name,
        email: data.user?.email,
        role: data.user?.role,
      });
      console.log("step 5, login completed")

      navigate("/");

    } catch (error) {
      console.log("catched error", error)
      setServerError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-sm border border-gray-200 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-center text-gray-900">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to your Rentify account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
            />
            {error.email && <p className="text-red-500 text-sm font-medium mt-1">{error.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Error */}
          {serverError && (
            <p className="text-red-500 text-sm font-medium text-center">
              {serverError}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;