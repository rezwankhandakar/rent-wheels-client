// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const UpdateCar = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Load existing data
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/cars/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCar(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Failed to load car data");
//         setLoading(false);
//       });
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCar({ ...car, [name]: value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(car),
//       });

//       if (res.ok) {
//         toast.success("Car updated successfully!");
//         navigate("/my-listings");
//       } else {
//         toast.error("Update failed");
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!car) return <p className="text-center mt-10 text-red-600">Car not found</p>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         Update Car Information
//       </h2>

//       <form onSubmit={handleUpdate} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Car Name</label>
//           <input
//             type="text"
//             name="name"
//             value={car.name || ""}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <textarea
//             name="description"
//             value={car.description || ""}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             rows="3"
//           ></textarea>
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Category</label>
//           <select
//             name="category"
//             value={car.category || ""}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           >
//             <option value="Sedan">Sedan</option>
//             <option value="SUV">SUV</option>
//             <option value="Hatchback">Hatchback</option>
//             <option value="Luxury">Luxury</option>
//             <option value="Electric">Electric</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Rent Price (per day)</label>
//           <input
//             type="number"
//             name="rentPrice"
//             value={car.rentPrice || ""}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={car.location || ""}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Image URL</label>
//           <input
//             type="text"
//             name="imageUrl"
//             value={car.imageUrl || ""}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         {/* Read-only provider info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium mb-1">Provider Name</label>
//             <input
//               type="text"
//               value={car.providerName || user?.displayName || ""}
//               readOnly
//               className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Provider Email</label>
//             <input
//               type="email"
//               value={car.providerEmail || user?.email || ""}
//               readOnly
//               className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//         </div>

//         <div className="text-center mt-6">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Update Car
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateCar;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load existing car data
  useEffect(() => {
    fetch(`http://localhost:3000/api/cars/${id}`)
      .then(res => res.json())
      .then(data => {
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
      delete updatedCar._id; // ensure _id not sent
      if (updatedCar.rentPrice) updatedCar.rentPrice = Number(updatedCar.rentPrice);

      const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCar),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Car updated successfully!");
        navigate("/myListings");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10 text-red-600">Car not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Car</h2>
      <form onSubmit={handleUpdate} className="space-y-4">

        <div>
          <label>Car Name</label>
          <input type="text" name="name" value={car.name || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Description</label>
          <textarea name="description" value={car.description || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows="3" />
        </div>

        <div>
          <label>Category</label>
          <select name="category" value={car.category || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label>Rent Price</label>
          <input type="number" name="rentPrice" value={car.rentPrice || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Location</label>
          <input type="text" name="location" value={car.location || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label>Image URL</label>
          <input type="text" name="imageUrl" value={car.imageUrl || ""} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Provider Name</label>
            <input type="text" value={car.providerName || user?.displayName || ""} readOnly className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed" />
          </div>
          <div>
            <label>Provider Email</label>
            <input type="email" value={car.providerEmail || user?.email || ""} readOnly className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4">
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
