import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load car data
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

  const handleBooking = async () => {
    if (!user) return toast.error("Please login to book this car");

    try {
      const res = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: id,
          userName: user.displayName,
          userEmail: user.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Car booked successfully!");
        setCar({ ...car, status: "unavailable" }); 
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!car) return <p className="text-center mt-10 text-red-600">Car not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{car.name}</h2>
      <img src={car.imageUrl} alt={car.name} className="w-full h-64 object-cover rounded mb-4" />
      <p><strong>Description:</strong> {car.description}</p>
      <p><strong>Category:</strong> {car.category}</p>
      <p><strong>Rent Price:</strong> ${car.rentPrice}/day</p>
      <p><strong>Location:</strong> {car.location}</p>
      <p className={`font-medium ${car.status === "unavailable" ? "text-red-600" : "text-green-600"}`}>
        Status: {car.status || "Available"}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Provider Info:</h3>
        <p>Name: {car.providerName}</p>
        <p>Email: {car.providerEmail}</p>
      </div>

      <button
        disabled={car.status === "unavailable"}
        onClick={handleBooking}
        className={`mt-6 w-full py-2 rounded text-white ${car.status === "unavailable" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        Book Now
      </button>
    </div>
  );
};

export default CarDetails;
