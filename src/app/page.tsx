import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import GalleryBanner from "./components/GalleryBanner";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import NewsletterCTA from "./components/Newsletter";
import Partners from "./components/Partners";
import PopularTreks from "./components/PopularTreks";
import UpcomingTreks from "./components/UpcomingTreks";
import WhyChooseUs from "./components/WhyCooseUs";
import Treks from "./treks/page";


export default function HomePage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">

<HeroSection/>
     
      <div className="bg-gray-50">


      </div>
      <div className="bg-white-50">

      </div>
      <PopularTreks/>
    

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

{/* // Navbar, 
Hero Section,
Featured /Popular treks, 
How it works, Why Choose PYB,
 Upcoming treks,community CTA, 
 footer */}

      <HowItWorks/>
      <WhyChooseUs/>
      <PopularTreks/>
      <GalleryBanner/>
<NewsletterCTA/>
{/* <Partners/> */}
<Footer/>
    </div>
  );
}
