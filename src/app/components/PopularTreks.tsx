export default function PopularTreks() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Discover Our Popular Treks</h2>
        <p className="text-gray-500 mt-2">
          Find the adventure that suits you best.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <div className="p-6 border rounded-2xl shadow-sm">
            <img
              src="/popularTreksImage/image1.jpeg"
              alt="Everest Base Camp"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold">Everest Base Camp</h3>
            <p className="text-gray-500 mt-2">
              A breathtaking journey through diverse landscapes.
            </p>
          </div>
          <div className="p-6 border rounded-2xl shadow-sm">
                        <img
              src="/popularTreksImage/image2.jpeg"
              alt="Uttrakhand"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-500">Uttrakhand</p>
            <h3 className="font-semibold mt-2">
              Experience local culture.
            </h3>
          </div>
        </div>

        {/* Middle column */}
        <div className="space-y-6">
          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold">5,364m</h3>
            <p className="text-gray-500 mt-2">
              Challenging treks suitable for all levels.
            </p>
          </div>
          <div className="p-6 border rounded-2xl shadow-sm">
            <p className="text-gray-500">Hard</p>
            <h3 className="font-semibold mt-2">
              Tailored itineraries for every traveler.
            </h3>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold">12 days</h3>
            <p className="text-gray-500 mt-2">
              Safe routes to ensure peace of mind.
            </p>
          </div>
          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold">$1,200</h3>
            <p className="text-gray-500 mt-2">
              Expert guides to enhance your experience.
            </p>
          </div>
          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold">Annapurna Circuit</h3>
            <p className="text-gray-500 mt-2">
              Join a community of adventurers.
            </p>
          </div>
          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold">Himachal Pradesh</h3>
            <p className="text-gray-500 mt-2">
              Access to exclusive discounts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
