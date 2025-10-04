"use client";
import "./StartVideo.css";
import { useEffect, useRef, useState } from "react";
import { FaUsers, FaShieldAlt, FaComments } from "react-icons/fa";

export default function IntroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  const videoRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => setShowMenu(true);
    video.addEventListener("ended", onEnded);

    return () => video.removeEventListener("ended", onEnded);
  }, []);

  // handle sound toggle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !soundOn;
    }
  }, [soundOn]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute top-8 right-8 z-20 ">
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
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="#">Clients</a>
            <a href="#">Portfolio</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      {/* Sound control */}
      <div className="absolute bottom-6 left-8 z-20 flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            id="soundToggle"
            checked={soundOn}
            onChange={() => setSoundOn((prev) => !prev)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span id="soundLabel" className="text-white">
          {soundOn ? "Sound On " : "Sound Off "}
        </span>
      </div>

      {/* Cards */}
      <div
        id="menu"
        className={`absolute icon-row bottom-8 left-1/2 -translate-x-1/2 flex gap-6 transition-all duration-700 ${
          showMenu
          ?"opacity-100 translate-y-0" 
            :"opacity-0 pointer-events-none translate-y-8"
        }`}
      >
        <a href="/about">
          <div className="block-container">
            <div className="icon menu-item">
              <div className="btn-back btn-back-1"></div>
              <div className="btn-front">
                {/* <svg className="frame">
                  <rect rx="32" stroke="url(#gradient-half)" />
                </svg> */}
                <FaUsers className="new-icon " />
              </div>
              <h4 className="pl-4 !text-[0.875rem]">About Us</h4>
            </div>
          </div>
        </a>

        <a href="#">
          <div className="block-container">
            <div className="icon menu-item">
              <div className="btn-back btn-back-1 wu"></div>
              <div className="btn-front">
                {/* <svg className="frame">
                  <rect rx="32" stroke="url(#gradient-half)" />
                </svg> */}
                {/* <i className="fa-solid fa-shield-halved"></i> */}
                <FaShieldAlt className="new-icon" />
              </div>
              <h4 className="pl-8 !text-[0.875rem]">Why Us</h4>
            </div>
          </div>
        </a>

        <a href="#">
          <div className="block-container">
            <div className="icon menu-item">
              <div className="btn-back btn-back-1"></div>
              <div className="btn-front">
                {/* <svg className="frame">
                  <rect rx="32" stroke="url(#gradient-half)" />
                </svg> */}
                {/* <i className="fa-solid fa-comments"></i> */}
                <FaComments className="new-icon" />
              </div>
              <h4 className="pl-4 !text-[0.875rem]">Testimonials</h4>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
