"use client";
import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

const NewMarqueeGlobe = () => {
  const globeRef = useRef();
  const [size, setSize] = useState({ width: 600, height: 600 });
  const [fontSize, setFontSize] = useState(14); // label font size

  const countries = [
    { name: "Canada", lat: 56.1304, lng: -106.3468 },
    { name: "USA", lat: 37.0902, lng: -95.7129 },
    { name: "Mexico", lat: 23.6345, lng: -102.5528 },
    { name: "United Kingdom", lat: 55.3781, lng: -3.436 },
    { name: "Puerto Rico", lat: 18.2208, lng: -66.5901 },
    { name: "Brazil", lat: -14.235, lng: -51.9253 },
    { name: "Nigeria", lat: 9.082, lng: 8.6753 },
    { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
    { name: "India", lat: 20.5937, lng: 78.9629 },
    { name: "Australia", lat: -25.2744, lng: 133.7751 },
    { name: "New Zealand", lat: -40.9006, lng: 174.886 },
  ];

  useEffect(() => {
    const applyControls = () => {
      if (globeRef.current && typeof globeRef.current.controls === "function") {
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 3;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
      } else {
        requestAnimationFrame(applyControls);
      }
    };
    applyControls();
  }, []);

  useEffect(() => {
    const focusOnNewZealand = () => {
      if (
        globeRef.current &&
        typeof globeRef.current.pointOfView === "function"
      ) {
        globeRef.current.pointOfView(
          { lat: 10.9006, lng: 174.886 }, // New Zealand
          2000 // smooth transition duration in ms
        );
      } else {
        requestAnimationFrame(focusOnNewZealand);
      }
    };
    focusOnNewZealand();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      let newSize, newFont;

      if (vw >= 1440) {
        newSize = { width: 780, height: 820 };
        newFont = 16;
      } else if (vw >= 1280) {
        newSize = { width: 710, height: 720 };
      } else if (vw >= 1024) {
        newSize = { width: 600, height: 600 };
        newFont = 14;
      } else if (vw >= 768) {
        newSize = { width: 450, height: 450 };
        newFont = 12;
      } else {
        newSize = { width: 320, height: 320 };
        newFont = 10;
      }

      setSize(newSize);
      setFontSize(newFont);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#b4c4f0"
        atmosphereAltitude={0.22}
        htmlElementsData={countries}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.style.padding = "6px 10px";
          el.style.borderRadius = "10px";
          el.style.background = "rgba(255,255,255,0.15)";
          el.style.backdropFilter = "blur(6px)";
          el.style.border = "1px solid rgba(255,255,255,0.3)";
          el.style.color = "white";
          el.style.fontSize = `${fontSize}px`;
          el.style.fontWeight = "600";
          el.style.transition = "opacity 0.8s ease-in-out";
          el.style.opacity = "0";
          el.innerHTML = d.name;

          const checkVisibility = () => {
            if (!globeRef.current) return;
            const camera = globeRef.current.camera();
            const radius = globeRef.current.getGlobeRadius();
            const pos = latLngToVector3(d.lat, d.lng, radius);
            const camDir = new THREE.Vector3();
            camera.getWorldDirection(camDir);
            const dot = camDir.dot(pos.normalize());
            el.style.opacity = dot > -0.1 ? "1" : "0";
            requestAnimationFrame(checkVisibility);
          };
          checkVisibility();

          return el;
        }}
      />
    </div>
  );
};

export default NewMarqueeGlobe;
