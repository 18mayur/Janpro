"use client";
import { useEffect, useState } from "react";
import StackCards from "./StackCards";
import Service from "./Service";
import './style.css';
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
