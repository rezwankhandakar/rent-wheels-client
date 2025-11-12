

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://rent-wheels-server-neon.vercel.app/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load cars");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-amber-500 font-bold text-5xl text-center mt-10">Loading cars...</p>;
  if (!cars.length) return <p className="text-center mt-10">No cars found.</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cars.map((car) => (
        <div
          key={car._id}
          className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          {/*Status Badge */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
              car.status === "unavailable"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {car.status === "unavailable" ? "Booked" : "Available"}
          </span>

          {/*Car Image */}
          <img
            src={car.imageUrl || "/placeholder-car.png"}
            alt={car.name}
            className="w-full h-48 object-cover"
          />

          {/* Car Info */}
          <div className="p-4">
            <h3 className="text-lg font-bold">{car.name}</h3>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Type:</span> {car.category}
            </p>
            <p>
              <span className="font-medium">Rent:</span> ${car.rentPrice} / day
            </p>
            <p className="text-gray-500 text-sm mt-1">
              <span className="font-medium">Provider:</span>{" "}
              {car.providerName}
            </p>

            <Link
              to={`/car-details/${car._id}`}
              className="block mt-4 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowseCars;
