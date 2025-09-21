export default function UpcomingTreks() {
  const treks = [
    {
      name: "Kedarkantha Trek",
      date: "Dec 15, 2025",
      status: "Few Seats Left",
    },
    {
      name: "Hampta Pass Trek",
      date: "Jan 5, 2026",
      status: "Open",
    },
    {
      name: "Valley of Flowers Trek",
      date: "July 10, 2026",
      status: "Registration Open",
    },
    {
      name: "Brahmatal Trek",
      date: "Feb 2, 2026",
      status: "Filling Fast",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Upcoming Treks 📅
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {treks.map((trek, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              {trek.name}
            </h3>
            <p className="text-gray-600 mb-2">Start Date: {trek.date}</p>
            <p
              className={`font-semibold ${
                trek.status.toLowerCase().includes("few") ||
                trek.status.toLowerCase().includes("fast")
                  ? "text-red-500"
                  : "text-yellow-600"
              }`}
            >
              {trek.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
