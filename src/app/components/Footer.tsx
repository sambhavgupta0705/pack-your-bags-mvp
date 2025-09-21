export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 w-full">
      {/* Main footer area */}
      <div className="w-full px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pack Your Bags</h2>
          <p className="mt-4 text-sm leading-6 text-gray-600 max-w-sm">
            Compare Himalayan treks, providers, and prices easily — just like booking flights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/" className="hover:text-gray-900">Home</a></li>
            <li><a href="/treks" className="hover:text-gray-900">Treks</a></li>
            <li><a href="/providers" className="hover:text-gray-900">Providers</a></li>
            <li><a href="/about" className="hover:text-gray-900">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Support</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-gray-900">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-gray-900">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-gray-900">Terms & Conditions</a></li>
            <li><a href="/disclaimer" className="hover:text-gray-900">Disclaimer</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Connect With Us</h3>
          <div className="mt-4 flex space-x-6 text-lg">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4 bg-gray-50">
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Pack Your Bags. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
