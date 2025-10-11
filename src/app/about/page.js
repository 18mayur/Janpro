"use client";
import { useEffect, useState } from "react";
import StackCards from "./StackCards";
import Service from "./Service";
import "./style.css";
import "./sample.css";
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showService, setShowService] = useState(false);
  const [phase, setPhase] = useState("intro"); // intro | animating | done

  // After animation finished, allow scroll-based fade swapping
  useEffect(() => {
    if (phase !== "done") return;

    const handleWheel = (e) => {
      if (e.deltaY > 0 && !showService) {
        setShowService(true);
      } else if (e.deltaY < 0 && showService) {
        setShowService(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [phase, showService]);

  return (
    <>
      {/* Header */}
      <header className="flex  items-center pt-10 px-16  z-504">
        <div className="logo fixed mt-10">
          <a href="#">
            <img
              src="/images/janprologo.svg"
              alt="logo"
              width={240}
              className="logo"
            />
          </a>
        </div>
        <div>
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            id="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`sidebar ${menuOpen ? "active" : ""}`} id="sidebar">
            <a href="index.php">Home</a>
            <a href="about.php">About</a>
            <a href="clients.php">Clients</a>
            <a href="#">Portfolio</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </header>

      {/* StackCards (intro section) */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1000ms] ${
          showService ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <StackCards phase={phase} setPhase={setPhase} />
      </div>
      {/* India Stories   */}
      {/* <div
        className={`absolute inset-0 transition-opacity duration-[1000ms] ${
          showService ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
       
        <h1
          className="absolute top-1/2 left-1/2  translate-x-[400px] translate-y-[-210px]
        text-[2.25rem] font-bold text-[#003da6] z-[999] text-center"
        >
          India Story
        </h1>
     
        <div className="full-screen relative w-screen h-screen overflow-hidden">
          <div
            className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 
            z-10 flex justify-center items-center"
          >
            <img src="/images/blur-map.png" alt="map" />
          </div>
        </div>

     
      <div  className="cards2 absolute top-1/2 left-1/2 z-[20]">
        <div className="card2 absolute left-card flex flex-col justify-center items-center text-center">
          <div className="flex gap-1 justify-center items-center text-[2.5rem] text-[#78bf21] font-bold">
          <h3 className="">450</h3><span className="">+</span>
          </div>
          <span className="text-[1.5rem] text-[#003da6] font-bold">
            Customers
          </span>
        </div>
        <div className="card2 absolute left-card flex flex-col justify-center items-center text-center"
        style={{ left: "0px", top: "80px" }}>
          <div className="flex gap-1 justify-center items-center text-[2.5rem] text-[#78bf21] font-bold">
          <h3 className="">6500</h3><span className="">+</span>
          </div>
          <span className="text-[1.5rem] text-[#003da6] font-bold">
            Janitors Employed​
          </span>
        </div>
      </div>
      
      </div> */}
      {/* Service section */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1000ms] ${
          showService ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Service />
      </div>
    </>
  );
}
