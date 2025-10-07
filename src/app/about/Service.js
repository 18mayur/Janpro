"use client";
 
import React, { useRef, useEffect } from "react";
 
const services = [
  {
    title: "HouseKeeping",
    desc: "Quality design must have a sense of authenticity",
    icon: "fa-compass-drafting",
    img: "/images/housecleaning.jfif",
  },
  {
    title: "HouseKeeping",
    desc: "“Interior decoration partly thrives on being social.”",
    icon: "fa-brush",
    img: "/images/housecleaning.jfif",
  },
  {
    title: "HouseKeeping",
    desc: '"The details are not the details. They make the design."',
    icon: "fa-screwdriver-wrench",
    img: "/images/housecleaning.jfif",
  },
  {
    title: "HouseKeeping",
    desc: "Quality design must have a sense of authenticity",
    icon: "fa-compass-drafting",
    img: "/images/housecleaning.jfif",
  },
  {
    title: "HouseKeeping",
    desc: "“Interior decoration partly thrives on being social.”",
    icon: "fa-brush",
    img: "/images/housecleaning.jfif",
  },
  {
    title: "Decorations",
    desc: "“Interior decoration partly thrives on being social.”",
    icon: "fa-brush",
    img: "/images/housecleaning.jfif",
  },
];
 
export default function Service() {
  const scrollRef = useRef(null);
 
  // Horizontal scroll
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
 
    const onWheel = (e) => {
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    };
 
    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, []);
 
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
 
      <div ref={scrollRef} className="mx-10 overflow-x-auto no-scrollbar py-16 w-full">
        <div className="flex gap-10 px-10 justify-center">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative flex-none w-[20%] min-w-[20%] h-96 rounded-4xl shadow-xl border border-[#cfdff7] cursor-pointer overflow-hidden transition-all duration-700 ease-in-out bg-gradient-to-b from-white to-gray-50 group
                ${index % 2 === 0 ? "translate-y-0" : "-translate-y-8"}`}
            >
              {/* Circle image stays until hover */}
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
              <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-none transition-all duration-500 ease-out scale-0 group-hover:scale-100 z-10"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out"
                />
              </div>
 
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 ease-in-out z-15"></div>
 
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
          ))}
        </div>
      </div>
    </div>
  );
}
 
 