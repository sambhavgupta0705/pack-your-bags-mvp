import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import GalleryBanner from "./components/GalleryBanner";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import NewsletterCTA from "./components/Newsletter";
import Partners from "./components/Partners";
import PopularTreks from "./components/PopularTreks";
import UpcomingTreks from "./components/UpcomingTreks";
import WhyChooseUs from "./components/WhyCooseUs";
import Treks from "./treks/page";

type Trek = {
  name: string;
  location: string;
  altitude: string;
  difficulty: string;
  duration: string;
  price: string;
};

const treks: Trek[] = [
  {
    name: "Kedarkantha Trek",
    location: "Uttarakhand",
    altitude: "12,500 ft",
    difficulty: "Easy-Moderate",
    duration: "6 Days",
    price: "₹6,500",
  },
  {
    name: "Hampta Pass Trek",
    location: "Himachal Pradesh",
    altitude: "14,100 ft",
    difficulty: "Moderate",
    duration: "5 Days",
    price: "₹7,500",
  },
  {
    name: "Valley of Flowers Trek",
    location: "Uttarakhand",
    altitude: "12,000 ft",
    difficulty: "Easy-Moderate",
    duration: "6 Days",
    price: "₹6,800",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Compare Himalayan Treks Easily
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Find the best trek for you – compare providers, prices, reviews, and
          more.
        </p>
        <a
          href="#treks"
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Explore Treks
        </a>
      </section>
      <div className="py-16 px-6 bg-gray-50">
<UpcomingTreks/>

      </div>
      <div className="py-16 px-6 bg-white-50">

      </div>
      {/* Popular Treks Section */}
      <section id="treks" className="py-16 px-6 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Popular Treks
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {treks.map((trek, index) => (
            <div
              key={index}
              className="bg-white border border-black-300 rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold mb-2 text-black-600">
                {trek.name}
              </h3>
              <p className="text-gray-600">{trek.location}</p>
              <p className="text-sm text-gray-500 mt-1">
                Altitude: {trek.altitude}
              </p>
              <p className="text-sm text-gray-500">
                Difficulty: {trek.difficulty}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {trek.duration}
              </p>
              <p className="text-black-600 font-semibold mt-3">
                {trek.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
<section className="text-center py-20 bg-yellow-50 w-full">
  <h2 className="text-2xl font-semibold mb-4">
    Ready to Pack Your Bags?
  </h2>
  <a
    href="/treks"
    className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
  >
    View All Treks
  </a>
</section>


      <HowItWorks/>
      <WhyChooseUs/>
      <PopularTreks/>
      <GalleryBanner/>
<NewsletterCTA/>
<Partners/>
<Footer/>
    </div>
  );
}
