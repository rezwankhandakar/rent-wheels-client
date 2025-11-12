

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load car data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedCar = { ...car };
      delete updatedCar._id;
      if (updatedCar.rentPrice)
        updatedCar.rentPrice = Number(updatedCar.rentPrice);

      const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCar),
      });

      const data = await res.json();

      if (data.modifiedCount || data.success) {
        toast.success("✅ Car updated successfully!");


        setCar({
          name: "",
          description: "",
          category: "",
          rentPrice: "",
          location: "",
          imageUrl: "",
          providerName: user?.displayName || "",
          providerEmail: user?.email || "",
        });

    
        setTimeout(() => navigate("/myListings"), 1200);
      } else {
        toast.error(data.message || " Update failed");
      }
    } catch (err) {
      toast.error(" Server error");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!car)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Car not found
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Update Car
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label>Car Name</label>
          <input
            type="text"
            name="name"
            value={car.name || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={car.description || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="3"
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={car.category || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label>Rent Price</label>
          <input
            type="number"
            name="rentPrice"
            value={car.rentPrice || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={car.location || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={car.imageUrl || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Provider Name</label>
            <input
              type="text"
              value={car.providerName || user?.displayName || ""}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label>Provider Email</label>
            <input
              type="email"
              value={car.providerEmail || user?.email || ""}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4 transition-all"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
