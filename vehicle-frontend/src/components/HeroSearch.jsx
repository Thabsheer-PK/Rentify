import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";

const locations = ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Alappuzha", "Kollam", "Kannur", "Kottayam", "Palakkad", "Malappuram", "Wayanad"];
const categories = [
  { value: "", label: "All Categories" },
  { value: "daily", label: "Daily Rental" },
  { value: "monthly", label: "Monthly Rental" },
  { value: "event", label: "Event" },
];

const HeroSearch = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    navigate(`/vehicles?${params.toString()}`);

  };

  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-lg md:p-6">
      <div className="grid gap-4 md:grid-cols-3">

        {/* Location */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <MapPin className="h-3.5 w-3.5" /> Location
          </label>

          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="flex items-center text-xs font-medium text-gray-500">
            <MapPin className="h-1 w-1 opacity-0" />
            Category
          </label>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-400 -mt-0.5"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 py-2.5 rounded-lg flex items-center justify-center"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Vehicles
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroSearch;