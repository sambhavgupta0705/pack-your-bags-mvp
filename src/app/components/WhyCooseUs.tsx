import { Check } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Comprehensive Comparisons",
      points: [
        "Multiple providers listed.",
        "Detailed reviews from fellow trekkers.",
        "Side-by-side pricing analysis.",
      ],
    },
    {
      title: "Informed Decisions",
      points: [
        "Filter by trek difficulty.",
        "Sort by duration for your convenience.",
        "User-friendly interface for seamless navigation.",
      ],
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
        Why Choose Us?
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Unlock the best trekking experiences.
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">{feature.title}</h3>
            <ul className="space-y-3 mb-4">
              {feature.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <a
              href="#treks"
              className="text-sm font-semibold text-black hover:underline"
            >
              Start comparing now! →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
