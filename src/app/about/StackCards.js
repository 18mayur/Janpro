"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import NewMarqueeGlobe from "@/components/NewMarqueeglobe";
import "./sample.css";

export default function StackCards({ phase, setPhase }) {
  const titleRef = useRef(null);
  const redBoxRef = useRef(null);
  const cardsRef = useRef(null);
  const overlayRef = useRef(null);

  const triggeredRef = useRef(false);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const redBox = redBoxRef.current;
    const cards = cardsRef.current.querySelectorAll(".card");
    const overlay = overlayRef.current;

    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // initial title fade in
    gsap.fromTo(
      title,
      { opacity: 0, y: 40, scale: 1 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );

    // initial positions
    gsap.set(redBox, { opacity: 0, scale: 0.8 });
    gsap.set(cards, { opacity: 0 });
    gsap.set(overlay, { opacity: 0 });

    // Animation timeline
    const tl = gsap.timeline({ paused: true });

    // 🟢 Title goes left & scales down when scroll starts
    tl.to(title, {
      x: -736,
      y:-195, // moves title to the left
      scale: 0.6, // scale down font size visually from 3.75rem → 2.25rem (approx)
      duration: 1.2,
      ease: "power2.inOut",
    })
      // 🟣 Globe fade in + hold
      .to(redBox, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      })
      .to({}, { duration: 2 }) // pause for 2s for globe focus
      // 🟡 Cards directional fade
      .fromTo(
        cards[0],
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" } // left card
      )
      .fromTo(
        cards[1],
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        cards[2],
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      // overlay fade transition
      .to(overlay, { opacity: 1, duration: 1.2, ease: "power2.inOut" }, "+=0")
      .to(overlay, {
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
      })
      .call(() => {
        document.body.style.overflow = prevBodyOverflow || "";
        setPhase && setPhase("done");
      });

    // Trigger animation when user scrolls slightly
    const triggerIntro = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setPhase && setPhase("animating");
      tl.play();

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 6) return;
      e.preventDefault && e.preventDefault();
      triggerIntro();
    };

    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
    };

    const handleTouchMove = (e) => {
      if (touchStartYRef.current == null) return;
      const currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const dy = touchStartYRef.current - currentY;
      if (Math.abs(dy) > 20) {
        e.preventDefault && e.preventDefault();
        triggerIntro();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      try {
        tl.kill();
      } catch (err) {}
      document.body.style.overflow = prevBodyOverflow || "";
    };
  }, [setPhase]);

  return (
    <div className="full-screen relative w-screen h-screen overflow-hidden">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2000] pointer-events-none"
      ></div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        text-[3.75rem] font-bold text-[#003da6] z-[999] text-center"
      >
        Welcome To Janpro
      </h1>
      

      {/* Globe */}
      <div
        ref={redBoxRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        z-10 flex justify-center items-center"
      >
        <NewMarqueeGlobe />
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="cards absolute top-1/2 left-1/2 z-[20]">
        <div
          className="card absolute left-card flex flex-col justify-center items-center text-center"
          style={{ left: "-470px", top: "306px" }}
        >
          <h3 className="text-[2.5rem] text-[#78bf21] font-bold">11+</h3>
          <span className="text-[1.5rem] text-[#003da6] font-bold">
            Countries Served
          </span>
        </div>

        <div
          className="card absolute right-card flex flex-col justify-center items-center text-center"
          style={{ left: "440px", top: "-128px" }}
        >
          <h3 className="text-[2.5rem] text-[#78bf21] font-bold">35000+</h3>
          <span className="text-[1.35rem] text-[#003da6] font-bold">
            Customers Worldwide
          </span>
        </div>

        <div
          className="card absolute right-card flex flex-col justify-center items-center text-center"
          style={{ left: "440px", top: "10px" }}
        >
          <h3 className="text-[2.5rem] text-[#78bf21] font-bold">96%</h3>
          <span className="text-[1.35rem] text-[#003da6] font-bold">
            Client Retention
          </span>
        </div>
      </div>
    </div>
  );
}
