"use client";
import { useState } from "react";
import NewMarqueeGlobe from "@/components/NewMarqueeglobe";
import Image from "next/image";
import "./style.css";
import StackCards from "./StackCards";
import Service from "./Service"
import Sample3 from "./Sample3";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
 <> 
    {/* <Sample/> */}
    {/* <Sample3/> */}
    <header className="flex  items-center pt-10 px-16  z-">
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

        {/* Hamburger + Sidebar */}
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
      <StackCards/>
      <section>
        <Service/>
      </section>
    </>
  );
}
