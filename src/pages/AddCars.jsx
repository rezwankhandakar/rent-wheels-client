
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const AddCar = () => {
  const { user } = useAuth();

  const [carData, setCarData] = useState({
    name: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newCar = {
      ...carData,
      providerName: user?.displayName,
      providerEmail: user?.email,
    };

    try {
      const res = await fetch("https://rent-wheels-server-neon.vercel.app/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });

      if (res.ok) {
        toast.success("Car added successfully!"); 
        setCarData({
          name: "",
          description: "",
          category: "Sedan",
          rentPrice: "",
          location: "",
          imageUrl: "",
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to add car!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      {/* Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add a New Car
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Car Name</label>
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Rent Price (per day)</label>
          <input
            type="number"
            name="rentPrice"
            value={carData.rentPrice}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={carData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Hosted Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={carData.imageUrl}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Provider Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Provider Email</label>
          <input
            type="text"
            value={user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white flex justify-center items-center ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading && <span className="loading loading-spinner text-white mr-2"></span>}
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
