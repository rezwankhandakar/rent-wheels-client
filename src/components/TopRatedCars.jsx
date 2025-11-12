

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopRatedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cars/top-rated")
      .then((res) => setCars(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Top Rated Cars
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car._id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/*  Status Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  car.status === "unavailable"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {car.status === "unavailable" ? "Booked" : "Available"}
              </span>

              {/* Car Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Car Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {car.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Type:</span> {car.category}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Provider:</span>{" "}
                  {car.providerName}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-medium">Rent:</span> ${car.rentPrice}/day
                </p>

                <Link to={`/car-details/${car._id}`}>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedCars;
