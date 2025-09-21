// components/Navbar.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black-500">
          Pack Your Bags
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-black-500 transition">Home</Link>
          <Link href="/treks" className="hover:text-black-500 transition">Treks</Link>
          <Link href="/blogs" className="hover:text-black-500 transition">Blogs</Link>
          <Link href="/about" className="hover:text-black-500 transition">About</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
          <Link href="/" className="block hover:text-black-500">Home</Link>
          <Link href="/treks" className="block hover:text-black-500">Treks</Link>
          <Link href="/blogs" className="block hover:text-black-500">Blogs</Link>
          <Link href="/about" className="block hover:text-black-500">About</Link>
        </div>
      )}
    </nav>
  );
}
