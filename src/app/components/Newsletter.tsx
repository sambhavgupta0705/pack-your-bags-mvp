// components/NewsletterCTA.tsx

export default function NewsletterCTA() {
  return (
    <section className="bg-yellow-50 py-16 px-6 text-center rounded-2xl shadow-md max-w-3xl mx-auto my-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Stay Updated on New Treks 🚀
      </h2>
      <p className="text-gray-600 mb-6">
        Be the first to know when we add new treks, providers, and offers.  
        Join our mailing list today!
      </p>
      <form className="flex flex-col sm:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-lg border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Notify Me
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </section>
  );
}
