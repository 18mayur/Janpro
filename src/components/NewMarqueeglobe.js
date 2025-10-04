'use client'
import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

const NewMarqueeGlobe = () => {
  const globeRef = useRef();

  const countries = [
    { name: "Canada", lat: 56.1304, lng: -106.3468 },
    { name: "USA", lat: 37.0902, lng: -95.7129 },
    { name: "Mexico", lat: 23.6345, lng: -102.5528 },
    { name: "United Kingdom", lat: 55.3781, lng: -3.4360 },
    { name: "Puerto Rico", lat: 18.2208, lng: -66.5901 },
    { name: "Brazil", lat: -14.2350, lng: -51.9253 },
    { name: "Nigeria", lat: 9.0820, lng: 8.6753 },
    { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
    { name: "India", lat: 20.5937, lng: 78.9629 },
    { name: "Australia", lat: -25.2744, lng: 133.7751 },
    { name: "New Zealand", lat: -40.9006, lng: 174.8860 }
  ];

  // auto-rotate controls
  useEffect(() => {
    const applyControls = () => {
      if (globeRef.current && typeof globeRef.current.controls === "function") {
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2; // rotation speed
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
      } else {
        requestAnimationFrame(applyControls);
      }
    };
    applyControls();
  }, []);

  // helper: convert lat/lng → Vector3
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
      style={{
        width: "580px",
        height: "570px",
        position: "relative"
      }}
    >
      <Globe
        ref={globeRef}
        width={580}
        height={570}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="white"
        showAtmosphere={true}
        atmosphereColor="#046cc7"
        atmosphereAltitude={0.22}
        htmlElementsData={countries}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.style.padding = "6px 12px";
          el.style.borderRadius = "10px";
          el.style.background = "rgba(255,255,255,0.15)";
          el.style.backdropFilter = "blur(6px)";
          el.style.border = "1px solid rgba(255,255,255,0.3)";
          el.style.color = "white";
          el.style.fontSize = "14px";
          el.style.fontWeight = "bold";
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

            // smoother range:
            // fade in when dot > -0.1 (slightly before center)
            // fade out when dot < 0.2 (slightly after center)
            if (dot > -0.1) {
              el.style.opacity = "1"; // fade in earlier
            } else {
              el.style.opacity = "0"; // fade out earlier
            }

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