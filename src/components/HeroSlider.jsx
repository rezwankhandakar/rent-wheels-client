import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    title: "Drive Your Dream Car",
    description: "Experience the best rides at affordable prices.",
    image: "https://i.ibb.co/CKn3qfCt/Screenshot-2025-11-09-161307.png",
    buttonText: "View Cars",
    buttonLink: "",
  },
  {
    id: 2,
    title: "Affordable Rentals",
    description: "Flexible pricing and daily rental plans.",
    image: "https://i.ibb.co/zV6fKh8m/Screenshot-2025-11-09-161540.png",
    buttonText: "Check Pricing",
    buttonLink: "",
  },
  {
    id: 3,
    title: "Trusted Providers",
    description: "We partner with verified and reliable car providers.",
    image: "https://i.ibb.co/Q3FxRhQC/Screenshot-2025-11-09-161708.png",
    buttonText: "Our Partners",
    buttonLink: "",
  },
];

const HeroSlider = () => {
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <Slider {...heroSettings}>
      {slides.map((slide) => (
        <div key={slide.id} className="relative w-full h-72 md:h-96">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: "brightness(0.6)", 
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
              {slide.title}
            </h2>
            <p className="text-white text-base md:text-lg mb-4">{slide.description}</p>
            <a
              href={slide.buttonLink}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
