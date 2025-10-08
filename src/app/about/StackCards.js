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

  // guards & touch state
  const triggeredRef = useRef(false);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const redBox = redBoxRef.current;
    const cards = cardsRef.current.querySelectorAll(".card");
    const overlay = overlayRef.current;

    // Prevent page scrolling while intro is pending
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // initial title fade-in on load
    gsap.fromTo(
      title,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );

    // prepare elements
    gsap.set(redBox, { opacity: 0, scale: 0.8, x: 0 });
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
    gsap.set(overlay, { opacity: 0 });

    // timeline (paused)
    const tl = gsap.timeline({ paused: true });

    tl.to(title, {
      y: -window.innerHeight / 2 + 80,
      scale: 0.9,
      duration: 1.2,
      ease: "power2.inOut",
    })
      .to(
        redBox,
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "+=0"
      )
      .to({}, { duration: 5 }) // globe pause
      .to(redBox, {
        x: -window.innerWidth / 4,
        duration: 1.5,
        ease: "power3.inOut",
      })
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.4,
          ease: "power2.out",
        },
        "+=0"
      )
      .to(overlay, { opacity: 1, duration: 1.2, ease: "power2.inOut" }, "+=0")
      // fade overlay out and then mark done
      .to(overlay, { opacity: 0, duration: 1.2, delay: 0.3, ease: "power2.out" })
      .call(() => {
        // restore body overflow so parent can add virtual scroll swapping
        document.body.style.overflow = prevBodyOverflow || "";
        setPhase && setPhase("done");
      });

    // trigger function (first user scroll/touch)
    const triggerIntro = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setPhase && setPhase("animating");
      tl.play();
      // remove listeners after triggering
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };

    // wheel handler for desktop
    const handleWheel = (e) => {
      // small threshold so slight accidental wheel doesn't fire
      if (Math.abs(e.deltaY) < 6) return;
      e.preventDefault && e.preventDefault(); // prevent native scroll
      triggerIntro();
    };

    // touch handlers for mobile
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

    // attach listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      try {
        tl.kill();
      } catch (err) {}
      // restore overflow in case timeline didn't run
      document.body.style.overflow = prevBodyOverflow || "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPhase]); // setPhase stable from parent; trigger only on mount

  return (
    <div className="full-screen relative w-screen h-screen overflow-hidden">
      {/* Fade overlay for transition */}
      <div
        ref={overlayRef}
        className="absolute inset-0  z-[2000] pointer-events-none"
      ></div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-[#003da6] z-[999] text-center"
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
      <div ref={cardsRef} className="cards flex flex-col gap-5">
        <div className="card flex flex-col justify-center items-center">
          <h3 className="text-[2.5rem] text-[#78bf21] font-bold">11+</h3>
          <span className="text-[1.5rem] text-[#003da6] font-bold">
            Countries Served
          </span>
        </div>
        <div className="card flex flex-col justify-center items-center">
          <h3 className="text-[2.5rem] text-[#78bf21] font-bold">35000+</h3>
          <span className="text-[1.35rem] text-center text-[#003da6] font-bold">
            Customers Worldwide
          </span>
        </div>
        <div className="card flex flex-col justify-center items-center">
          <h3 className="text-[2.5rem] text-[#78bf21] font-bold">96%</h3>
          <span className="text-[1.35rem] text-[#003da6] font-bold">
            Client Retention
          </span>
        </div>
      </div>
    </div>
  );
}
