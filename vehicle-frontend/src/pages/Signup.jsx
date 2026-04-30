import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log("Step 1 done, fetching completed")

      const data = await res.json();

      console.log("step 2 done, we got parsed data", data)
      if (!res.ok) {
        console.log("step 3 : not ok")
        setError(data.message);
        setLoading(false)
        return;

      }
      console.log("step 4 : before login")
      login({
        token: data.token,
        name: data.user?.name,
        email: data.user?.email,
        role: data.user?.role

      })
      console.log("step 5, after login")
      navigate("/")
    } catch (error) {
      console.error("Catch error", error)
      setError("Server error ,try again..")
    }
    setLoading(false)
  };

  const roles = [
    {
      value: "customer",
      title: "Customer",
      desc: "Browse and book vehicles",
    },
    {
      value: "provider",
      title: "Provider",
      desc: "List vehicles and earn money",
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-8">

          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>

          <p className="text-gray-500 text-xl mt-3">
            Join Rentify today
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-md font-semibold text-gray-900 mb-3">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-md font-semibold text-gray-900 mb-3">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-md font-semibold text-gray-900 mb-3">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-md font-semibold text-gray-900 mb-4">
                I am a...
              </label>

              <div className="space-y-4">
                {roles.map((item) => (
                  <label
                    key={item.value}
                    className={`flex gap-4 items-start border rounded-2xl p-3 cursor-pointer transition ${form.role === item.value
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 bg-white"
                      }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={item.value}
                      checked={form.role === item.value}
                      onChange={() => handleRoleChange(item.value)}
                      className="mt-1 accent-orange-500 w-4 h-4"
                    />

                    <div>
                      <h3 className="text-md font-semibold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 text-md">
                        {item.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-red-500 text-center text-sm font-medium">
                {error ? error : ''}
              </p>
            </div>
            {/* Button */}
            <button className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-md font-semibold transition
            "
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-md mt-8"
          onClick={() => navigate('/login')}>
          Already have an account?{" "}
          <span
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;