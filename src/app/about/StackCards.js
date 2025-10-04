"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "@motionone/dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import NewMarqueeGlobe from "@/components/NewMarqueeglobe";
import "./sample.css";
gsap.registerPlugin(ScrollTrigger, Observer);

export default function StackCards() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const redBoxRef = useRef(null);
  const cardsRef = useRef(null);
const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const title = titleRef.current;
    const redBox = redBoxRef.current;
    const cards = cardsRef.current.querySelectorAll(".card");

    // Disable native scroll
    document.body.style.overflow = "hidden";

    // Intro title animation
    animate(title, { opacity: [0, 1], y: [-50, 0] }, { duration: 1.2 });

    // Set initial positions
    gsap.set(title, { y: -150 });
    gsap.set(redBox, { opacity: 0, x: 0 });
    gsap.set(cards, { x: 300, y: 0, opacity: 0, scale: 1, zIndex: 1 });

    // Timeline
    const tl = gsap.timeline({ paused: true });

    // Phase 1: Title moves up
    tl.to(title, {
      y: -window.innerHeight / 2 + -80,
      scale: 0.8,
      duration: 1,
    });

    // Phase 2: Red box appears in center
    tl.to(redBox, { opacity: 1, x: 0, duration: 0.6 }, ">0.2");

    // Add a 3-second pause here:
    tl.addPause("+=5"); // <<< this stops timeline for 3s automatically

    // (optional) If you still want red box to move left after pause:
    tl.to(redBox, { x: -window.innerWidth / 4, duration: 1 });

    // Phase 3: Cards appear one by one at center
    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          opacity: 1,
          scale: 1,
          zIndex: i + 2,
          duration: 0.6,
        },
        ">0.3"
      );
    });

    // Observer to control timeline with scroll
    let step = 0;
    const maxStep = tl.totalDuration();

    Observer.create({
      type: "wheel,touch",
      wheelSpeed: -3.4,
      preventDefault: true,
      onUp: () => {
        if (step < maxStep) {
          step += 0.875;
          tl.tweenTo(step);
        }
      },
      onDown: () => {
        if (step > 0) {
          step -= 0.8;
          tl.tweenTo(step);
        }
      },
    });

    // Pin the container so the page does not scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      document.body.style.overflow = "";
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
    
      <div
      ref={containerRef}
      className="full-screen relative w-screen h-screen  overflow-hidden"
    >
      {/* Title */}
      <h1
        ref={titleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-black z-[999] text-center"
      >
        Welcome To Janpro
      </h1>

      {/* Red Box */}
      <div
        ref={redBoxRef}
        className="red-box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-10"
      >
        <NewMarqueeGlobe />
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="cards ">
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
    </div>
    </>
    
  );
}
