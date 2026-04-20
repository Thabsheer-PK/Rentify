import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleCard from "../components/VehicleCards";

const locations = ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Alappuzha", "Kollam", "Kannur", "Kottayam", "Palakkad", "Malappuram", "Wayanad"];
const categories = [
  { value: "", label: "All Categories" },
  { value: "daily", label: "Daily Rental" },
  { value: "monthly", label: "Monthly Rental" },
  { value: "event", label: "Events" },
];

const Vehicles = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category")?.toLowerCase() || ""
  );

  const [vehicles, setVehicles] = useState([]);
  const [loading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(()=>{
    fetch("http://localhost:3001/api/vehicles").then((res=> res.json())).then((data=> setVehicles(data)))
  },[])

  //  Filter logic
  const filtered = useMemo(() => {
    return vehicles.filter(v => {
      // Location filter
      if (selectedLocation && v.location !== selectedLocation) return false;

      // Category filter
      if (selectedCategory && v.category !== selectedCategory) return false;

      //  Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();

        const matches =
          v.name.toLowerCase().includes(term) ||
          v.category.toLowerCase().includes(term) ||
          v.type?.toLowerCase().includes(term) ||
          String(v._id).includes(term);

        if (!matches) return false;
      }

      return true;
    });
  }, [vehicles, selectedLocation, selectedCategory, searchTerm]);

  const clearFilters = () => {
    setSelectedLocation("");
    setSelectedCategory("");
  };

  useEffect(() => {
    setSelectedLocation(searchParams.get("location") || "");
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);


  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Browse Vehicles
            </h1>
            <div className="mb-4 w-50">
              <p className="text-gray-500 text-sm mt-1">
                {loading
                  ? "Loading..."
                  : `${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""} available`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="🔍Search vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 border-gray-500"
            />
            {/* Mobile Filters Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden border px-2 py-2 rounded-lg text-sm justify-end border-gray-500"
            >
              Filters
            </button>
          </div>

        </div>

        <div className="flex gap-6">

          {/* Sidebar */}
          <div className="hidden md:block w-64 bg-white p-5 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Filters</h3>

            {/* Location */}
            <div className="mb-4">
              <label className="text-sm text-gray-500">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedLocation(value);

                  const params = new URLSearchParams(searchParams);
                  if (value) params.set("location", value);
                  else params.delete("location");

                  setSearchParams(params);
                }}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              >
                <option value="">All Locations</option>
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="text-sm text-gray-500">Category</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map(c => (
                  <button
                    key={c.value}
                    onClick={() => {
                      setSelectedCategory(c.value);

                      const params = new URLSearchParams(searchParams);
                      if (c.value) params.set("category", c.value);
                      else params.delete("category");

                      setSearchParams(params);
                    }}
                    className={`px-3 py-1 rounded-lg border text-sm ${selectedCategory === c.value
                      ? "bg-orange-500 text-white"
                      : ""
                      }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="text-red-500 text-sm"
            >
              Clear Filters
            </button>
          </div>

          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden ">

              {/* Background Overlay */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowFilters(false)}
              ></div>

              {/* Sidebar */}
              <div className="absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-lg">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-lg"
                  >
                    ✖
                  </button>
                </div>

                {/* 🔍 Search */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="🔍Search vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                {/* 📍 Location */}
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  >
                    <option value="">All Locations</option>
                    {locations.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* 📂 Category */}
                <div className="mb-4">
                  <label className="text-sm text-gray-500">Category</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map(c => (
                      <button
                        key={c.value}
                        onClick={() => setSelectedCategory(c.value)}
                        className={`px-3 py-1 rounded-lg border text-sm ${selectedCategory === c.value
                          ? "bg-orange-500 text-white"
                          : ""
                          }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                <button
                  onClick={clearFilters}
                  className="text-red-500 text-sm"
                >
                  Clear Filters
                </button>

              </div>
            </div>
          )}

          {/* Vehicles Grid */}
          <div className="flex-1">

            {loading ? (
              <p className="text-center py-10">Loading vehicles...</p>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-medium">
                  No vehicles found
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 border px-4 py-2 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map(v => (
                  <VehicleCard key={v._id} vehicle={v} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Vehicles;