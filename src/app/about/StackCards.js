"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewMarqueeGlobe from "@/components/NewMarqueeglobe";
import "./sample.css";

gsap.registerPlugin(ScrollTrigger);

export default function StackCards() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const redBoxRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const redBox = redBoxRef.current;
    const cards = cardsRef.current.querySelectorAll(".card");

    // -------- PART 1: On Page Load - Fade in Title --------
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    // -------- PART 2: Scroll-triggered animation --------
    gsap.set(redBox, { opacity: 0, scale: 0.8 });
    gsap.set(cards, { opacity: 0, y: 100, scale: 0.8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // Scroll sequence
    tl.to(title, { y: -window.innerHeight / 2 + 80, scale: 0.8, duration: 1 })
      .to(redBox, { opacity: 1, scale: 1, duration: 1 }, "+=0.2")
      .to(redBox, { x: -window.innerWidth / 4, duration: 1 })
      .to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.3,
        duration: 0.6,
      });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="full-screen relative w-screen h-screen overflow-hidden"
    >
      {/* Title */}
      <h1
        ref={titleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-black z-[999] text-center"
      >
        Welcome To Janpro
      </h1>

      {/* Globe */}
      <div
        ref={redBoxRef}
        className="red-box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <NewMarqueeGlobe />
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="cards">
        <div className="card flex flex-col justify-center items-center">
          <h3 className="text-[2.5rem] text-white font-bold">11+</h3>
          <span className="text-[1.35rem] text-white font-bold">
            Countries Served
          </span>
        </div>
        <div className="card flex flex-col justify-center items-center">
          <h3 className="text-[2.5rem] text-white font-bold">35000+</h3>
          <span className="text-[1.35rem] text-center text-white font-bold">
            Customers Worldwide
          </span>
        </div>
        <div className="card flex flex-col justify-center items-center">
          <h3 className="text-[2.5rem] text-white font-bold">96%</h3>
          <span className="text-[1.35rem] text-white font-bold">
            Client Retention
          </span>
        </div>
      </div>
    </div>
  );
}
