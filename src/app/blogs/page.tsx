// app/blogs/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
};

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      // Default blogs
      setBlogs([
        {
          id: 1,
          title: "Top 5 Himalayan Treks for Beginners",
          excerpt: "If you're new to trekking, start with these safe yet scenic Himalayan trails...",
          content: "Detailed content about top beginner-friendly Himalayan treks...",
          date: "Sep 18, 2025",
        },
        {
          id: 2,
          title: "How to Pack Light for a 7-Day Trek",
          excerpt: "A guide to smart packing — carry less, trek more comfortably...",
          content: "In-depth content about packing light and efficiently...",
          date: "Sep 10, 2025",
        },
      ]);
    }
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Trekking Blogs ✍️
      </h1>

      {/* Blog Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`}>
            <article className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-yellow-500">
                {blog.title}
              </h2>
              <p className="text-gray-600 flex-1">{blog.excerpt}</p>
              <p className="text-sm text-gray-500 mt-4">{blog.date}</p>
            </article>
          </Link>
        ))}
      </div>

      {/* Submit Blog CTA */}
      <section className="mt-20 text-center bg-yellow-50 border border-yellow-200 rounded-2xl p-10 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Want to Share Your Trekking Story?
        </h2>
        <p className="text-gray-700 mb-6">
          We’d love to feature your experience! Submit your blog and inspire other trekkers.
        </p>
        <Link href="/blogs/submit">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition">
            Submit a Blog
          </button>
        </Link>
      </section>
    </main>
  );
}
