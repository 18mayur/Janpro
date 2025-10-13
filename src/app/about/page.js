"use client";
import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewMarqueeGlobe from "@/components/NewMarqueeglobe";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Service from "./Service";
import "./style.css";
import "./sample.css";
import Service from "./Service";

gsap.registerPlugin(ScrollTrigger);
const services = [
  {
    title: "HouseKeeping",
    desc: "Quality design must have a sense of authenticity",
    icon: "fa-compass-drafting",
    img: "/images/housekeeping.jpg",
  },
  {
    title: "HVAC Maintenance",
    desc: "“Interior decoration partly thrives on being social.”",
    icon: "fa-brush",
    img: "/images/hvac.webp",
  },
  {
    title: "Pest Control",
    desc: '"The details are not the details. They make the design."',
    icon: "fa-screwdriver-wrench",
    img: "/images/pestcontrol.webp",
  },
  {
    title: "Repairs",
    desc: "Quality design must have a sense of authenticity",
    icon: "fa-compass-drafting",
    img: "/images/repair.jpg",
  },
  {
    title: "Decoration",
    desc: "Beauty and function in harmony.",
    icon: "fa-brush",
    img: "/images/housekeeping.jpg",
  },
  {
    title: "Electricals",
    desc: "Design is intelligence made visible.",
    icon: "fa-screwdriver-wrench",
    img: "/images/hvac.webp",
  },
  {
    title: "Painting",
    desc: "Colors that bring life to your space.",
    icon: "fa-paint-roller",
    img: "/images/pestcontrol.webp",
  },
  {
    title: "Cleaning",
    desc: "Clean spaces, clear minds.",
    icon: "fa-broom",
    img: "/images/repair.jpg",
  },
];
export default function Page() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [phase, setPhase] = useState("intro"); // intro | animating | done

  // refs
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const globeWrapperRef = useRef(null);
  const cardsRef = useRef(null);
  const overlayRef = useRef(null);

  const indiaRef = useRef(null);
  const indiaTitleRef = useRef(null);
  const indiaMapRef = useRef(null);
  const indiaCardsRef = useRef(null);

  const serviceRef = useRef(null);
  const serviceTitleRef = useRef(null);
  const serviceSliderRef = useRef(null);

  const lenisRef = useRef(null);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      try {
        lenis.destroy();
      } catch (e) {}
      lenisRef.current = null;
    };
  }, []);

  // Sync Lenis + ScrollTrigger
  useEffect(() => {
    if (!lenisRef.current) return;
    const onScroll = () => ScrollTrigger.update();
    lenisRef.current.on("scroll", onScroll);
    const rebind = () => ScrollTrigger.refresh();
    window.addEventListener("resize", rebind);
    return () => {
      if (lenisRef.current) lenisRef.current.off("scroll", onScroll);
      window.removeEventListener("resize", rebind);
    };
  }, []);

  // Main animations
  useEffect(() => {
    // ---------------- INTRO SECTION ----------------
    const introEl = introRef.current;
    const titleEl = titleRef.current;
    const globeWrap = globeWrapperRef.current;
    const cardsContainer = cardsRef.current;
    const overlay = overlayRef.current;

    const cards = cardsContainer.querySelectorAll(".card");

    // Initial states
    gsap.set(titleEl, { opacity: 1, scale: 1, y: 0 });
    gsap.set(globeWrap, {
      opacity: 0,
      scale: 0.95,
      transformOrigin: "50% 50%",
    });
    cards.forEach((c) => gsap.set(c, { opacity: 0, x: 0, y: 30 }));
    gsap.set(overlay, { opacity: 0 });

    const introScrollDistance = 4200; // long cinematic scroll
    const introTL = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: introEl,
        start: "top top",
        end: `+=${introScrollDistance}`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    const titleExitDistance = -Math.max(window.innerHeight * 0.9, 600);
    introTL.to(
      titleEl,
      { y: titleExitDistance, opacity: 0.95, scale: 0.85, duration: 1.2 },
      0
    );
    introTL.to(globeWrap, { opacity: 1, scale: 1, duration: 0.8 }, 1.2);
    introTL.to({}, { duration: 3 }); // hold globe

    // Cards appear one by one
    introTL.to(cards[0], { opacity: 1, x: -40, y: 0, duration: 1 }, "+=0");
    introTL.to({}, { duration: 1 });
    introTL.to(cards[1], { opacity: 1, x: -20, y: 10, duration: 1 }, "+=0");
    introTL.to({}, { duration: 1 });
    introTL.to(cards[2], { opacity: 1, x: 40, y: -6, duration: 1 }, "+=0");
    introTL.to({}, { duration: 1 });

    // Globe zoom and fade-out
    introTL.to(globeWrap, { scale: 1.35, duration: 0.8 }, "+=0");
    introTL.to(overlay, { opacity: 0.12, duration: 0.6 }, "+=0.2");
    introTL.to(introEl, { opacity: 0, duration: 0.6 }, "-=0.2");

    // ---------------- INDIA STORY SECTION ----------------
    // INDIA STORY SECTION ANIMATION
    gsap.registerPlugin(ScrollTrigger);

    const indiaEl = indiaRef.current;
    const indiaTitleEl = indiaTitleRef.current;
    const indiaMapEl = indiaMapRef.current;
    const indiaCardsContainer = indiaCardsRef.current;
    if (indiaEl && indiaTitleEl && indiaMapEl && indiaCardsContainer) {
      // select cards
      const indiaCards = indiaCardsContainer.querySelectorAll(".india-card");

      // reset starting state (prevent bouncing)
      gsap.set(indiaTitleEl, {
        opacity: 0,
        y: 40,
        x: 0,
        top: "50%",
        left: "50%",
        right: "auto",
        transform: "translate(-50%,-50%)",
      });
      gsap.set(indiaMapEl, { opacity: 0, scale: 0.98 });
      indiaCards.forEach((c) => gsap.set(c, { opacity: 0, y: 30 }));

      // single pinned scrubbed timeline for India section
      const indiaTL = gsap.timeline({
        scrollTrigger: {
          trigger: indiaEl,
          start: "top top",
          end: "+=1400", // long enough for title hold + move + map + cards
          scrub: 0.8,
          pin: true,
          anticipatePin: 0.5,
          // markers: true,
        },
      });

      // 1) Fade title in at center (as globe fades out)
      indiaTL.to(indiaTitleEl, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // 2) Hold the title centered for a short scroll distance (approx 1s worth)
      indiaTL.to({}, { duration: 0.9 });

      // 3) Move title smoothly to top-right (below header) — use px calc to avoid transform stacking
      // compute target in runtime for precision
      const rect = indiaTitleEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const targetTopPx = 108; // 24px from top
      const targetRightPx = 140; // 24px from right
      const targetCenterX = vw - targetRightPx - rect.width / 2;
      const currentCenterX = rect.left + rect.width / 2;
      const deltaX = targetCenterX - currentCenterX;
      // animate using translate to avoid messing with 'left' CSS
      indiaTL.to(indiaTitleEl, {
        duration: 1.2,
        ease: "power2.inOut",
        x: deltaX,
        y: -(window.innerHeight / 2 - targetTopPx - rect.height / 2), // move up to near top
        scale: 0.95,
      });

      // 4) small pause, then map fades in (center)
      indiaTL.to({}, { duration: 0.25 });
      indiaTL.to(
        indiaMapEl,
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        "+=0"
      );

      // 5) Cards appear staggered from below (one by one)
      indiaTL.to(
        indiaCards,
        {
          opacity: 1,
          y: 0,
          stagger: 0.8,
          duration: 0.9,
          ease: "power2.out",
        },
        "+=0.1"
      );
    }
    // ---------------- SERVICE SECTION ----------------
    const svcEl = serviceRef.current;
    const svcTitle = serviceTitleRef.current;
    const svcWrapper = serviceSliderRef.current;

    if (svcEl && svcTitle && svcWrapper) {
      // Reset starting state
      gsap.set(svcTitle, {
        opacity: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        transform: "none",
      });
      gsap.set(svcWrapper, { opacity: 0, y: 30 });

      const serviceTL = gsap.timeline({
        scrollTrigger: {
          trigger: svcEl,
          start: "top top",
          end: "+=1600",
          scrub: 0.8,
          pin: true,
          anticipatePin: 0.5,
          // markers: true,
        },
      });

      // 1️⃣ Fade out previous India section
      serviceTL.to(indiaRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // 2️⃣ Fade in title from center
      serviceTL.to(svcTitle, {
        opacity: 1,
        yPercent: -50,
        duration: 1.2,
        ease: "power2.out",
      });

      // 3️⃣ Hold title in center for a moment
      serviceTL.to({}, { duration: 0.8 });

      // 4️⃣ Move title straight to TOP CENTER (not right)
      const headerHeight = 96; // adjust if your header is taller/shorter
      serviceTL.to(svcTitle, {
        top: `${headerHeight + 16}px`,
        left: "50%",
        xPercent: -50,
        yPercent: 0,
        duration: 1.2,
        ease: "power2.inOut",
      });

      // 5️⃣ Hold briefly
      serviceTL.to({}, { duration: 0.25 });

      // 6️⃣ Fade in slider smoothly
      serviceTL.to(
        svcWrapper,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "+=0.1"
      );

      ScrollTrigger.refresh();
    }

    return () => {
      try {
        introTL.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      } catch (e) {}
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className="flex items-center pt-6 px-8 z-50"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: "transparent",
        }}
      >
        <div className="logo" style={{ position: "relative", zIndex: 1101 }}>
          <a href="#">
            <img src="/images/janprologo.svg" alt="logo" width={240} />
          </a>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div className={`hamburger`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Intro Section */}
      <section
        ref={introRef}
        className="full-screen relative"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2050,
            background: "rgba(255,255,255,0)",
          }}
        />
        <h1
          ref={titleRef}
          className="absolute text-[3.75rem] font-bold text-[#003da6] z-[999] text-center"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        >
          Welcome To Janpro to moved Forward
        </h1>
        <div
          ref={globeWrapperRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-center"
          style={{
            width: "fit-content",
            height: "fit-content",
            pointerEvents: "none",
          }}
        >
          <NewMarqueeGlobe />
        </div>
        <div
          ref={cardsRef}
          className="cards absolute top-1/2 left-1/2 z-[20]"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <div
            className="card absolute left-card flex flex-col justify-center items-center text-center"
            style={{ left: "-480px", top: "10px" }}
          >
            <div className="flex gap-1 justify-center items-center text-[2.5rem] text-[#78bf21] font-bold">
              <h3>11</h3>
              <span>+</span>
            </div>
            <span className="text-[1.5rem] text-[#003da6] font-bold">
              Countries Served
            </span>
          </div>
          <div
            className="card absolute right-card flex flex-col justify-center items-center text-center"
            style={{ left: "-480px", top: "158px" }}
          >
            <div className="flex gap-1 justify-center items-center text-[2.5rem] text-[#78bf21] font-bold">
              <h3>35000</h3>
              <span>+</span>
            </div>
            <span className="text-[1.35rem] text-[#003da6] font-bold">
              Customers Worldwide
            </span>
          </div>
          <div
            className="card absolute right-card flex flex-col justify-center items-center text-center"
            style={{ left: "440px", top: "10px" }}
          >
            <div className="flex gap-1 justify-center items-center text-[2.5rem] text-[#78bf21] font-bold">
              <h3>65</h3>
              <span>%</span>
            </div>
            <span className="text-[1.35rem] text-[#003da6] font-bold">
              Client Retention
            </span>
          </div>
        </div>
      </section>

      {/* India Story Section */}
      <section
        ref={indiaRef}
        className="india-section full-screen relative"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          ref={indiaTitleRef}
          className="india-title text-[2.25rem] font-bold text-[#003da6] z-[999] text-center"
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          India Story
        </h2>

        <div
          ref={indiaMapRef}
          className="india-map absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-center"
          style={{ pointerEvents: "none", opacity: 0 }}
        >
          <img
            src="/images/blur-map.png"
            alt="map"
            style={{ maxWidth: "640px" }}
          />
        </div>

        <div
          ref={indiaCardsRef}
          className="cards2 absolute top-1/2 left-1/2 z-[20]"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <div
            className="india-card card2 absolute flex flex-col justify-center items-center text-center"
            style={{ left: "-480px", top: "-16px" }}
          >
            <div className="flex gap-1 justify-center items-center text-[2.5rem] text-[#78bf21] font-bold">
              <h3>450</h3>
              <span>+</span>
            </div>
            <span className="text-[1.5rem] text-[#003da6] font-bold">
              Customers
            </span>
          </div>

          <div
            className="india-card card2 absolute flex flex-col justify-center items-center text-center"
            style={{ left: "-480px", top: "100px" }}
          >
            <div className="flex gap-1 justify-center items-center text-[2.5rem] text-[#78bf21] font-bold">
              <h3>6500</h3>
              <span>+</span>
            </div>
            <span className="text-[1.5rem] text-[#003da6] font-bold">
              Janitors Employed​
            </span>
          </div>
        </div>
      </section>

      {/* service Section */}
      <section
        ref={serviceRef}
        className="india-section full-screen relative"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          ref={serviceTitleRef}
          className="service-title text-[2.25rem] font-bold text-[#003da6] z-[999] text-center"
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0, // start hidden
          }}
        >
          Service Section
        </h2>

        <div
          ref={serviceSliderRef}
          className="w-full max-w-[1260px] py-16 overflow-hidden"
          style={{ opacity: 0, transform: "translateY(20px)" }} // start hidden + slightly down
        >
          <Service />
        </div>
      </section>
    </>
  );
}
