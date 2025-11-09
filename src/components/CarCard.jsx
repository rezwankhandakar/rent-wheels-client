import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg overflow-hidden">
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-lg">{car.name}</h2>
        <p>Type: {car.category}</p>
        <p>Price: ${car.price}/day</p>
        <p>Provider: {car.providerName}</p>
        <Link
          to={`/car/${car.id}`}
          className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
