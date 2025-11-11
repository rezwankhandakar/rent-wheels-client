

import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cars/featured")
      .then((res) => setCars(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Cars
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
            >
              {/* Car Image */}
              <div className="w-full h-40 sm:h-48 md:h-52 overflow-hidden relative">
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Car Info */}
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">
                  {car.name}
                </h3>
                <p className="text-gray-600 text-sm mb-0.5">
                  <span className="font-medium">Rent:</span> ${car.rentPrice}/day
                </p>
                <p className="text-gray-600 text-sm mb-0.5">
                  <span className="font-medium">Type:</span> {car.category}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Provider:</span> {car.providerName}
                </p>
                <button className="w-full bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
