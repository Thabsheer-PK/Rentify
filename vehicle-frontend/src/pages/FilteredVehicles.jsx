import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleCard from "../components/VehicleCards";
import VehiclesData from "../data/vehicle"

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

  const [vehicles] = useState(VehiclesData);
  const [loading] = useState(false);

  // 🔥 Filter logic
  const filtered = useMemo(() => {
    return vehicles.filter(v => {
      if (selectedLocation && v.location !== selectedLocation) return false;
      if (selectedCategory && v.category !== selectedCategory) return false;
      return true;
    });
  }, [vehicles, selectedLocation, selectedCategory]);

  console.log(selectedCategory);
  console.log(selectedLocation);
  console.log(searchParams.get("location"));
  console.log(searchParams.get("category"));
  console.log(vehicles);
  console.log(filtered);  

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
            <p className="text-gray-500 text-sm mt-1">
              {loading
                ? "Loading..."
                : `${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""} available`}
            </p>
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
                  <VehicleCard key={v.id} vehicle={v} />
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