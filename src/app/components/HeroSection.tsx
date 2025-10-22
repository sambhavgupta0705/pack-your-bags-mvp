"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "/hero/everest-base-camp.jpg",
  "/hero/kedarkantha.jpg",
  "/hero/hampta-pass.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change slide every 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Slideshow */}
      {images.map((img, index) => (
        <motion.img
          key={img}
          src={img}
          alt="trek image"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}

      {/* Overlay (lighter to let yellow CTAs pop) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-3 drop-shadow-lg"
        >
          Find, Compare & Book Your Next Himalayan Adventure
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-lg md:text-xl mb-6 max-w-2xl"
        >
          Discover treks, compare providers, and plan your journey 
        </motion.p>

        {/* CTA buttons (yellow based theme) */}
        <div className="flex gap-4">
          <button
            className="bg-yellow-400 hover:bg-yellow-450/90 text-black px-6 py-3 text-lg font-medium rounded-2xl shadow-lg transition"
            aria-label="Compare Treks"
          >
            Compare Treks
          </button>

          <button
            className="bg-transparent border border-yellow-300 text-yellow-300 px-6 py-3 text-lg font-medium rounded-2xl hover:bg-yellow-300/10 transition"
            aria-label="View All Treks"
          >
            View All Treks
          </button>
        </div>


      </div>
    </div>
  );
}
