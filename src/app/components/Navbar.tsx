"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Pack Your Bags</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/treks">Treks</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}
