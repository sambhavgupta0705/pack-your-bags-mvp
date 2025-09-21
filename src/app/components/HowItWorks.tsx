export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Step 1: Browse Treks",
      description: "Explore our curated list of Himalayan treks.",
    },
    {
      step: "2",
      title: "Step 2: Compare Providers",
      description: "Evaluate pricing, reviews, and trek difficulty easily.",
    },
    {
      step: "3",
      title: "Step 3: Book Your Adventure",
      description: "Secure your spot and get ready for an unforgettable journey.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        How to Use Pack Your Bags
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Finding the perfect trek is just a few steps away!
      </p>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((item, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition"
          >
            {/* Step Badge */}
            <span className="absolute top-3 left-3 bg-gray-100 text-gray-700 text-sm font-semibold px-2 py-1 rounded-lg">
              {item.step}
            </span>

            {/* Placeholder image box */}
            <div className="flex items-center justify-center bg-gray-50 border rounded-xl h-32 mb-6">
              <span className="text-gray-400">🖼️</span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
