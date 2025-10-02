"use client";

import { useEffect, useState } from "react";

type Provider = {
  name: string;
  price: number;
  link: string;
};

type Trek = {
  id: number;
  name: string;
  season: "Winter" | "Summer" | "Monsoon" | "Autumn";
  difficulty: "Easy" | "Moderate" | "Difficult";
  duration: string;
  altitude: string;
  image: string;
  providers: Provider[];
};

export default function TreksPage() {
  const [treks, setTreks] = useState<Trek[]>([]);
  const [selectedTrek, setSelectedTrek] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [expandedTrek, setExpandedTrek] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/treks.json")
      .then((res) => res.json())
      .then((data) => {
        setTreks(data as Trek[]);
        setLoading(false);
      });
  }, []);

  const filteredTreks = treks.filter((trek) => {
    return (
      (selectedTrek ? trek.name === selectedTrek : true) &&
      (selectedSeason ? trek.season === selectedSeason : true) &&
      (selectedDifficulty ? trek.difficulty === selectedDifficulty : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters */}
      <div className="bg-blue-900 py-8 text-white flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Compare Himalayan Treks</h1>
        <div className="bg-white text-gray-900 rounded-2xl shadow-lg flex flex-wrap gap-4 p-4 w-full max-w-5xl items-center">
          {/* Trek Filter */}
          <select
            value={selectedTrek}
            onChange={(e) => setSelectedTrek(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          >
            <option value="">All Treks</option>
            {treks.map((trek) => (
              <option key={trek.id} value={trek.name}>
                {trek.name}
              </option>
            ))}
          </select>

          {/* Season Filter */}
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          >
            <option value="">All Seasons</option>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Monsoon">Monsoon</option>
            <option value="Autumn">Autumn</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading treks...</p>
        ) : filteredTreks.length === 0 ? (
          <p className="text-center text-gray-500">No treks found.</p>
        ) : (
          filteredTreks.map((trek) => (
            <div
              key={trek.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Trek Header */}
              <div
                onClick={() =>
                  setExpandedTrek(expandedTrek === trek.id ? null : trek.id)
                }
                className="flex items-center cursor-pointer p-5"
              >
                {/* Trek Image */}
                <img
                  src={trek.image}
                  alt={trek.name}
                  className="w-40 h-28 object-cover rounded-xl border"
                />

                {/* Trek Info */}
                <div className="ml-6 flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {trek.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {trek.duration} • {trek.altitude}
                  </p>

                  {/* Badges */}
                  <div className="flex gap-3 mt-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        trek.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : trek.difficulty === "Moderate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {trek.difficulty}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        trek.season === "Winter"
                          ? "bg-blue-100 text-blue-700"
                          : trek.season === "Summer"
                          ? "bg-orange-100 text-orange-700"
                          : trek.season === "Monsoon"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {trek.season}
                    </span>
                  </div>
                </div>

                {/* Toggle Button */}
                <button className="text-blue-600 font-semibold hover:underline">
                  {expandedTrek === trek.id
                    ? "▲ Hide Providers"
                    : "▼ View Providers"}
                </button>
              </div>

              {/* Providers */}
              {expandedTrek === trek.id && (
                <div className="border-t divide-y bg-gray-50">
                  {trek.providers.map((provider, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center px-6 py-4 hover:bg-white transition"
                    >
                      <p className="font-medium text-gray-800">
                        {provider.name}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-blue-700">
                          ₹{provider.price}
                        </p>
                        <a
                          href={provider.link}
                          className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold transition"
                        >
                          Book
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
