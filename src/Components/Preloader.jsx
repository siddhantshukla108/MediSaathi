import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ setLoading }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const particlesRef = useRef([]);

  // Create 10 particles dynamically
  const particleCount = 10;

  useEffect(() => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
  });

  // Animate particles
  particlesRef.current.forEach((el) => {
    tl.fromTo(
      el,
      { x: 0, y: 0, opacity: 0 },
      {
        x: () => Math.random() * 300 - 150,
        y: () => Math.random() * 300 - 150,
        opacity: 1,
        duration: 1,
        yoyo: true,
        repeat: 1,
      },
      0
    );
  });

  // Logo animation
  tl.fromTo(
    logoRef.current,
    { opacity: 0, scale: 0.8, rotation: 0 },
    { opacity: 1, scale: 1, rotation: 360, duration: 1.5 }
  );

  // Fade out preloader
  tl.to(containerRef.current, {
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    onComplete: () => setLoading(false), // ✅ call here
  });

  // Optional safety fallback (just in case)
  const fallback = setTimeout(() => setLoading(false), 5000);
  return () => clearTimeout(fallback);
}, [setLoading]);


  // Create particle divs
  const renderParticles = () => {
    let arr = [];
    for (let i = 0; i < particleCount; i++) {
      arr.push(
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="w-4 h-4 bg-white rounded-full absolute"
        ></div>
      );
    }
    return arr;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gray-800 flex items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Particles */}
      {renderParticles()}

      {/* Your Logo */}
      <img
        ref={logoRef}
        src="/img/logou.png" // make sure logo is in public/img/
        alt="My Logo"
        className="w-51 h-51 object-contain z-10 rounded-full"
      />
    </div>
  );
}
