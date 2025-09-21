"use client";

export default function GalleryGrid() {
  const images = [
    { src: "/gallery/kedarkantha.jpg", alt: "Kedarkantha Trek" },
    { src: "/gallery/hampta.jpg", alt: "Hampta Pass Trek" },
    { src: "/gallery/valley.jpg", alt: "Valley of Flowers" },
    { src: "/gallery/bhrigu.jpg", alt: "Bhrigu Lake Trek" },
    { src: "/gallery/roopkund.jpg", alt: "Roopkund Trek" },
    { src: "/gallery/sandakphu.jpg", alt: "Sandakphu Trek" },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Himalayan Highlights 🌄
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-48 md:h-60 object-cover hover:scale-105 transition duration-300"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x300?text=" +
                  img.alt.replace(" ", "+"))
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
