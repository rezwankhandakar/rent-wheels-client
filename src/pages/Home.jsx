import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "../components/HeroSlider";
import FeaturedCars from "../components/FeaturedCars";
import WhyRentWithUs from "../components/WhyRentWithUs";
import TopRatedCars from "../components/TopRatedCars";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get("https://rent-wheels-server-neon.vercel.app/api/cars/featured")
      .then(res => setFeaturedCars(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false)); 
  }, []);


  const filteredCars = featuredCars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-amber-500 font-bold text-5xl mt-2">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-10">
        <HeroSlider />
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <input
          type="text"
          placeholder="Search cars by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </section>

      {/* Featured Cars Section */}
      <section className="mb-10">
        <FeaturedCars cars={filteredCars} />
      </section>

      {/* Why Rent With Us */}
      <WhyRentWithUs />

      {/* Top Rated Cars */}
      <TopRatedCars />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;
