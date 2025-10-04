"use client";
import { useState } from "react";
import NewMarqueeGlobe from "@/components/NewMarqueeglobe";
import Image from "next/image";
import "./style.css";
import StackCards from "./StackCards";
import Sample3 from "./Sample3";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <>
    //   <header className="flex items-center pt-10 px-16">
    //     <div className="logo">
    //       <a href="#">
    //         <img
    //           src="/images/janprologo.svg"
    //           alt="logo"
    //           width={240}
    //           className="logo"
    //         />
    //       </a>
    //     </div>

    //     {/* Hamburger + Sidebar */}
    //     <div>
    //       <div
    //         className={`hamburger ${menuOpen ? "active" : ""}`}
    //         id="hamburger"
    //         onClick={() => setMenuOpen(!menuOpen)}
    //       >
    //         <span></span>
    //         <span></span>
    //         <span></span>
    //       </div>

    //       <div className={`sidebar ${menuOpen ? "active" : ""}`} id="sidebar">
    //         <a href="index.php">Home</a>
    //         <a href="about.php">About</a>
    //         <a href="clients.php">Clients</a>
    //         <a href="#">Portfolio</a>
    //         <a href="#">Contact</a>
    //       </div>
    //     </div>
    //   </header>

    //   <section className="flex justify-center mt-6 gap-8">
    //     {/* Stats */}
    //     <div className="flex w-[480px] justify-center">
    //       <div className="flex flex-col justify-center gap-[3.2rem]">
    //         {/* Box 1 */}
    //         <div className="bg-blue">
    //           <div className="btn-back btn-back-1"></div>
    //           <div className="stat-box ">
    //             <h2 className="number">11+</h2>
    //             <p className="label">Countries Served</p>
    //           </div>
    //         </div>
    //         {/* Box 2 */}
    //         <div className="bg-blue">
    //           <div className="btn-back btn-back-1"></div>
    //           <div className="stat-box">
    //             <h2 className="number">35000+</h2>
    //             <p className="label">customers worldwide​</p>
    //           </div>
    //         </div>
    //         {/* Box 3 */}
    //         <div className="bg-blue">
    //           <div className="btn-back btn-back-1"></div>
    //           <div className="stat-box">
    //             <h2 className="number">96%</h2>
    //             <p className="label">Client Retention​</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Globe */}
    //     <div className="globe-div">
    //       <NewMarqueeGlobe />
    //     </div>

    //     {/* Country list */}
    //     <div className="country-div hidden">
    //       <ul>
    //         <div className="flex text-xs gap-4 items-start">
    //           <div>
    //             <li>Canada</li>
    //             <li>USA</li>
    //             <li>Mexico</li>
    //             <li>India</li>
    //             <li>Puerto Rico</li>
    //             <li>Brazil</li>
    //           </div>
    //           <div>
    //             <li>Nigeria</li>
    //             <li>Saudi Arabia</li>
    //             <li>United Kingdom</li>
    //             <li>Australia</li>
    //             <li>New Zealand</li>
    //           </div>
    //         </div>
    //       </ul>
    //     </div>
    //   </section>
    // </>
    <>
    
    {/* <Sample/> */}
    {/* <Sample3/> */}
    <header className="flex items-center pt-10 px-16 relative z-">
           <div className="logo">
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
    </>
  );
}
