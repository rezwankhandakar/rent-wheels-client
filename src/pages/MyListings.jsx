import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyListings = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load user's cars
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/api/myCars?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCars(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to fetch cars");
          setLoading(false);
        });
    }
  }, [user]);

  // ✅ Delete Car
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCars(cars.filter((car) => car._id !== id));
        toast.success("Car deleted successfully!");
      } else {
        toast.error("Failed to delete car");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        My Listings
      </h2>

      {cars.length === 0 ? (
        <p className="text-center text-gray-600">No cars added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Car Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Rent Price</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{car.name}</td>
                  <td className="px-4 py-2 border">{car.category}</td>
                  <td className="px-4 py-2 border">${car.rentPrice}/day</td>
                  <td className="px-4 py-2 border text-green-600 font-medium">
                    {car.status || "Available"}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                 
                   <Link to={`/update-car/${car._id}`}>
  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
    Update
  </button>
</Link>

                    <button
                      onClick={() => handleDelete(car._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyListings;
