// components/Partners.tsx
"use client";

import React, { JSX } from "react";

type Provider = { name: string; logo: string };

export default function Partners(): JSX.Element {
  const providers: Provider[] = [
    { name: "Indiahikes", logo: "/partners/indiahikes.png" },
    { name: "Trek The Himalayas", logo: "/partners/tth.png" },
    { name: "Bikat Adventures", logo: "/partners/bikat.png" },
    { name: "Himalaya Trekkers", logo: "/partners/ht.png" },
  ];

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.src = `https://via.placeholder.com/160x48?text=${encodeURIComponent(
      img.alt
    )}`;
  };

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Trusted Trek Providers 🏔️
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-items-center max-w-5xl mx-auto">
        {providers.map((provider, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-40 h-20 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <img
              src={provider.logo}
              alt={provider.name}
              onError={handleImgError}
              className="max-h-12 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
