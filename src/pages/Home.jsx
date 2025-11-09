

import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "../components/HeroSlider";
import FeaturedCars from "../components/FeaturedCars";
import WhyRentWithUs from "../components/WhyRentWithUs";
import TopRatedCars from "../components/TopRatedCars";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/cars/featured")
      .then(res => setFeaturedCars(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-10 ">
        <HeroSlider />
      </section>

      {/* Featured Cars Section */}
        <FeaturedCars></FeaturedCars>

      {/* Why Rent With Us */}
      
        <WhyRentWithUs></WhyRentWithUs>
      {/* Extra Sections */}
        <TopRatedCars></TopRatedCars>

        {/* TODO: Testimonials */}
        <Testimonials></Testimonials>
      
    </div>
  );
};

export default Home;

