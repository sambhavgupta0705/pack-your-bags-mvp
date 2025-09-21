// app/blogs/submit/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitBlog() {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedBlogs = localStorage.getItem("blogs");
    const blogs = savedBlogs ? JSON.parse(savedBlogs) : [];

    const newBlog = {
      id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
      ...form,
      date: new Date().toLocaleDateString(),
    };

    blogs.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Your blog has been submitted! 🚀");
    router.push("/blogs");
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Submit Your Blog ✍️
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 border space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Blog Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your blog title"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Excerpt</label>
          <input
            type="text"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Short summary of your blog"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Blog Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={8}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Write your blog here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 transition"
        >
          Submit Blog
        </button>
      </form>
    </main>
  );
}
