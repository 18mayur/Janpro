"use client";
import "./sample.css"
import { useEffect, useRef } from "react";
import { animate } from "@motionone/dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import NewMarqueeGlobe from "@/components/NewMarqueeglobe";

gsap.registerPlugin(ScrollTrigger, Observer);

export default function Sample3() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const redBoxRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const redBox = redBoxRef.current;
    const cards = cardsRef.current.querySelectorAll(".card");

    // hide native scroll
    document.body.style.overflow = "hidden";

    // --- Intro title animation ---
    animate(title, { opacity: [0, 1], y: [-50, 0] }, { duration: 1.2 });

    // --- Set initial positions ---
    gsap.set(title, { y: 0 });
    gsap.set(redBox, { opacity: 0, x: 0 });
    gsap.set(cards, { x: 300, opacity: 0 });

    // --- Timeline ---
    const tl = gsap.timeline({ paused: true });

    // Phase 1: title moves to top
    tl.to(title, {
      y: -window.innerHeight / 2 + 80,
      scale: 0.8,
      duration: 1
    });

    // Phase 2: red box appears at center then moves to left
    tl.to(
      redBox,
      { opacity: 1, duration: 0.6 },
      ">0.2"
    );
    tl.to(
      redBox,
      { x: -window.innerWidth / 4, duration: 1 },
      ">0.1"
    );

    // Phase 3: Cards appear one by one
    cards.forEach((card) => {
      tl.to(card, { x: 0, opacity: 1, duration: 0.6 }, ">0.3");
    });

    // --- Observer to control timeline ---
    let step = 0;
    const maxStep = tl.totalDuration();

    Observer.create({
      type: "wheel,touch",
      wheelSpeed: -1,
      preventDefault: true,
      onUp: () => {
        if (step < maxStep) {
          step += 0.8;
          tl.tweenTo(step);
        }
      },
      onDown: () => {
        if (step > 0) {
          step -= 0.8;
          tl.tweenTo(step);
        }
      }
    });

    // Pin container so user does not scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      pinSpacing: false
    });

    return () => {
      document.body.style.overflow = "";
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="full-screen relative w-screen h-screen bg-[#fff] overflow-hidden"
    >
      {/* Title */}
      <h1
        ref={titleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white z-20 text-center"
      >
        Stacking Cards
      </h1>

      {/* Red Box */}
      <div
        ref={redBoxRef}
        className="red-box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-10"
      >
        <NewMarqueeGlobe/>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="cards absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6"
      >
        <div className="card w-64 h-40 bg-red-500 rounded-md"></div>
        <div className="card w-64 h-40 bg-red-500 rounded-md"></div>
        <div className="card w-64 h-40 bg-red-500 rounded-md"></div>
        <div className="card w-64 h-40 bg-red-500 rounded-md"></div>
      </div>
    </div>
  );
}