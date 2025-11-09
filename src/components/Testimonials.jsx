import React from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    message:
      "RentWheels made renting a car super easy! The service was fast and reliable. Highly recommended!",
    image: "https://i.ibb.co/60Y7TCbs/download-15.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Marketing Manager",
    message:
      "Amazing experience! The cars are well-maintained and the booking process is smooth.",
    image: "https://i.ibb.co/M5C4V9Zk/download-14.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Entrepreneur",
    message:
      "The best car rental service I've used so far. Affordable rates and trusted providers.",
    image: "https://i.ibb.co/dsCbL2Zr/images-7.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-600 italic mb-4">"{testimonial.message}"</p>
              <div className="flex items-center space-x-3 mt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
