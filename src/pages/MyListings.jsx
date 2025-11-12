

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/api/myCars?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCars(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error(" Failed to fetch cars");
          setLoading(false);
        });
    }
  }, [user]);

  // Delete Car
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCars((prev) => prev.filter((car) => car._id !== id));
        toast.success(" Car deleted successfully!");
      } else {
        toast.error(" Failed to delete car");
      }
    } catch (error) {
      toast.error(" Server error occurred");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">Loading your listings...</p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
        My Listings
      </h2>

      {cars.length === 0 ? (
        <p className="text-center text-gray-600">No cars added yet.</p>
      ) : (
        <>
          {/*  Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">Car Name</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Rent Price</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border">{car.name}</td>
                    <td className="px-4 py-2 border">{car.category}</td>
                    <td className="px-4 py-2 border">${car.rentPrice}/day</td>
                    <td className="px-4 py-2 border text-green-600 font-medium">
                      {car.status || "Available"}
                    </td>
                    <td className="px-4 py-2 border text-center space-x-2">
                      <Link to={`/update-car/${car._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                          Update
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(car._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cars.map((car) => (
              <div
                key={car._id}
                className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{car.name}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {car.category}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Rent:</strong> ${car.rentPrice}/day
                </p>
                <p className="text-sm text-green-600 font-medium mb-3">
                  {car.status || "Available"}
                </p>

                <div className="flex gap-2">
                  <Link to={`/update-car/${car._id}`} className="flex-1">
                    <button className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;
