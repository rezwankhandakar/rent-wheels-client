import React from "react";
import { FaClock, FaDollarSign, FaThumbsUp, FaRegSmile } from "react-icons/fa";

const WhyRentWithUs = () => {
  const benefits = [
    {
      icon: <FaClock size={30} className="text-blue-600 mb-3" />,
      title: "Easy Booking",
      description: "Book your car in a few simple steps without hassle.",
    },
    {
      icon: <FaDollarSign size={30} className="text-green-600 mb-3" />,
      title: "Affordable Rates",
      description: "Competitive pricing with flexible daily rental plans.",
    },
    {
      icon: <FaThumbsUp size={30} className="text-yellow-600 mb-3" />,
      title: "Trusted Providers",
      description: "We partner only with verified and reliable car providers.",
    },
    {
      icon: <FaRegSmile size={30} className="text-red-600 mb-3" />,
      title: "24/7 Support",
      description: "Our support team is available round the clock for assistance.",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Why Rent With Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition transform hover:-translate-y-1 hover:shadow-2xl"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRentWithUs;
