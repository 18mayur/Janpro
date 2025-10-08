"use client";
 
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Stack.css" 
const services = [
  {
    title: "HouseKeeping",
    desc: "Quality design must have a sense of authenticity",
    icon: "fa-compass-drafting",
    img: "/images/housekeeping.jpg",
  },
  {
    title: "HVAC Maintenance",
    desc: "“Interior decoration partly thrives on being social.”",
    icon: "fa-brush",
    img: "/images/hvac.webp",
  },
  {
    title: "Pest Control",
    desc: '"The details are not the details. They make the design."',
    icon: "fa-screwdriver-wrench",
    img: "/images/pestcontrol.webp",
  },
  {
    title: "Repairs",
    desc: "Quality design must have a sense of authenticity",
    icon: "fa-compass-drafting",
    img: "/images/repair.jpg",
  },
  {
    title: "Decoration",
    desc: "Beauty and function in harmony.",
    icon: "fa-brush",
    img: "/images/housekeeping.jpg",
  },
  {
    title: "Electricals",
    desc: "Design is intelligence made visible.",
    icon: "fa-screwdriver-wrench",
    img: "/images/hvac.webp",
  },
  {
    title: "Painting",
    desc: "Colors that bring life to your space.",
    icon: "fa-paint-roller",
    img: "/images/pestcontrol.webp",
  },
  {
    title: "Cleaning",
    desc: "Clean spaces, clear minds.",
    icon: "fa-broom",
    img: "/images/repair.jpg",
  },
];
 
export default function Service() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
 
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#f8faff] to-[#eef4ff]">
      <style>{`
        .slick-slide {
          display: flex !important;
          justify-content: center;
          align-items: flex-start;
        }
        .slick-track {
          display: flex !important;
          gap: 1.5rem; /* reduces spacing between cards */
        }
        .slick-list {
          overflow: visible !important;
          padding: 0 40px !important; /* adds left-right spacing */
        }
      `}</style>
 
      <div className="w-full overflow-hidden max-w-[1400px] py-16">
        <Slider {...settings}>
          {services.map((service, index) => (
            <div key={index}>
              <div
                className={`relative w-[280px] h-96 rounded-4xl shadow-xl border border-[#cfdff7] cursor-pointer overflow-hidden transition-all duration-700 ease-in-out bg-gradient-to-b from-white to-gray-50 group
                ${index % 2 === 0 ? "translate-y-0" : "-translate-y-8"}`}
              >
                {/* Circle image */}
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-[#0d6efd] shadow-md transition-all duration-300 ease-out z-20 group-hover:opacity-0">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex justify-center items-center text-3xl text-white">
                    <i className={`fa-solid ${service.icon}`} />
                  </div>
                </div>
 
                {/* Full card image appears on hover */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden transition-all duration-700 ease-out scale-0 group-hover:scale-100 group-hover:rounded-4xl z-10">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out"
                  />
                </div>
 
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-600 ease-in-out z-15"></div>
 
                {/* Content */}
                <div className="mt-[4rem] relative z-20 flex flex-col items-center justify-center text-center h-full p-6 transition-all duration-700 ease-in-out group-hover:justify-center">
                  <h3 className="px-5 py-2 bg-[#0d6efd] text-white rounded-full shadow-sm font-semibold text-lg transition-all duration-700 ease-in-out group-hover:bg-white/20 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-gray-500 text-sm group-hover:text-white transition-all duration-700 ease-in-out px-4 max-w-[90%]">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
 