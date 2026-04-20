import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddVehiclePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    type: "",
    fuel: "petrol",
    transmission: "manual",
    location: "",
    price: "",
    category: "daily",
    seats: "",
    mileage: "",
    description: "",
    owner: { name: "", phone: "" },
    images: [""],
    availability: true
  });
  const validateForm = () => {
    if (
      !form.name ||
      !form.brand ||
      !form.model ||
      !form.type ||
      !form.fuel ||
      !form.transmission ||
      !form.location ||
      !form.price ||
      !form.category ||
      !form.seats ||
      !form.mileage ||
      !form.description ||
      !form.owner.name ||
      !form.owner.phone ||
      form.images.length === 0 ||
      form.images.some(img => !img)
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOwnerChange = (e) => {
    setForm({
      ...form,
      owner: { ...form.owner, [e.target.name]: e.target.value }
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all fields properly")
      return;
    }

    await fetch("http://localhost:3001/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Vehicle Added");
    navigate("/");
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Vehicle</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-md"
      >

        {/* BASIC INFO */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Basic Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Vehicle Name"
              value={form.name} onChange={handleChange} className={inputStyle} />

            <input name="brand" placeholder="Brand"
              value={form.brand} onChange={handleChange} className={inputStyle} />

            <input name="model" placeholder="Model Year"
              value={form.model} onChange={handleChange} className={inputStyle} />

            <input name="type" placeholder="Type (SUV, Sedan...)"
              value={form.type} onChange={handleChange} className={inputStyle} />
          </div>
        </div>

        {/* VEHICLE DETAILS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select name="fuel" value={form.fuel} onChange={handleChange} className={inputStyle}>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>

            <select name="transmission" value={form.transmission} onChange={handleChange} className={inputStyle}>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>

            <input name="seats" type="number" placeholder="Seats"
              value={form.seats} onChange={handleChange} className={inputStyle} />

            <input name="mileage" placeholder="Mileage"
              value={form.mileage} onChange={handleChange} className={inputStyle} />
          </div>
        </div>

        {/* PRICING */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="price" type="number" placeholder="Price"
              value={form.price} onChange={handleChange} className={inputStyle} />

            <select name="category" value={form.category} onChange={handleChange} className={inputStyle}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          <input name="location" placeholder="City"
            value={form.location} onChange={handleChange} className={inputStyle} />
        </div>

        {/* OWNER */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Owner Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Owner Name"
              value={form.owner.name} onChange={handleOwnerChange} className={inputStyle} />

            <input name="phone" placeholder="Phone Number"
              value={form.owner.phone} onChange={handleOwnerChange} className={inputStyle} />
          </div>
        </div>

        {/* IMAGES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Images</h2>

          {form.images.map((img, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className={`${inputStyle} flex-1`}
                placeholder="Image URL"
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-3 bg-red-500 text-white rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="text-orange-500 font-medium"
          >
            + Add Image
          </button>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Description</h2>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className={inputStyle}
            placeholder="Vehicle details..."
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Add Vehicle
        </button>

      </form>
    </div>
  );
}

export default AddVehiclePage;