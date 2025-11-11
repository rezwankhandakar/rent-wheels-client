import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/api/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load bookings");
        setLoading(false);
      });
  }, [user]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (bookings.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-gray-700">
          No bookings found
        </h2>
        <p className="text-gray-500">You haven’t booked any car yet.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Bookings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="w-full h-44 overflow-hidden">
              <img
                src={booking.imageUrl}
                alt={booking.carName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">
                {booking.carName}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Rent:</strong> ${booking.rentPrice}/day
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {booking.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Provider:</strong> {booking.providerName}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Booked On:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>

              <button
                onClick={() => toast.success("Car booking confirmed!")}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
