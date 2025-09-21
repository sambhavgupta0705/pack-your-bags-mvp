"use client";

import { useState } from "react";

type Trek = {
  id: number;
  name: string;
  location: string;
  altitude: string;
  difficulty: "Easy" | "Moderate" | "Difficult";
  duration: string;
  price: string;
  image: string;
};

const treks: Trek[] = [
  {
    id: 1,
    name: "Kedarkantha Trek",
    location: "Uttarakhand",
    altitude: "12,500 ft",
    difficulty: "Easy",
    duration: "6 Days",
    price: "₹6,500",
    image: "/gallery/kedarkantha.jpg",
  },
  {
    id: 2,
    name: "Hampta Pass Trek",
    location: "Himachal Pradesh",
    altitude: "14,100 ft",
    difficulty: "Moderate",
    duration: "5 Days",
    price: "₹7,500",
    image: "/gallery/hampta.jpg",
  },
  {
    id: 3,
    name: "Valley of Flowers",
    location: "Uttarakhand",
    altitude: "12,000 ft",
    difficulty: "Easy",
    duration: "6 Days",
    price: "₹6,800",
    image: "/gallery/valley.jpg",
  },
  {
    id: 4,
    name: "Brahmatal Trek",
    location: "Uttarakhand",
    altitude: "12,250 ft",
    difficulty: "Moderate",
    duration: "6 Days",
    price: "₹8,000",
    image: "/gallery/brahmatal.jpg",
  },
];

export default function TreksPage() {
  const [filters, setFilters] = useState({
    difficulty: "All",
    duration: "All",
    location: "All",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredTreks = treks.filter((trek) => {
    return (
      (filters.difficulty === "All" || trek.difficulty === filters.difficulty) &&
      (filters.duration === "All" || trek.duration === filters.duration) &&
      (filters.location === "All" || trek.location === filters.location)
    );
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Explore Treks 🏔️
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {/* Difficulty */}
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition cursor-pointer"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>

        {/* Duration */}
        <select
          name="duration"
          value={filters.duration}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition cursor-pointer"
        >
          <option value="All">All Durations</option>
          {[...new Set(treks.map((t) => t.duration))].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition cursor-pointer"
        >
          <option value="All">All Regions</option>
          {[...new Set(treks.map((t) => t.location))].map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Trek Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredTreks.map((trek) => (
          <div
            key={trek.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <img
              src={trek.image}
              alt={trek.name}
              className="w-full h-48 object-cover"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x300?text=" +
                  trek.name.replace(" ", "+"))
              }
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {trek.name}
              </h2>
              <p className="text-sm text-gray-600">{trek.location}</p>
              <p className="text-sm text-gray-500 mt-1">
                Altitude: {trek.altitude}
              </p>
              <p className="text-sm text-gray-500">Duration: {trek.duration}</p>
              <p className="text-sm font-semibold text-yellow-600 mt-2">
                {trek.difficulty} · {trek.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
