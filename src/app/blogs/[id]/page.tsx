// app/blogs/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
};

export default function BlogDetails({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      const blogs: Blog[] = JSON.parse(savedBlogs);
      const foundBlog = blogs.find((b) => b.id === parseInt(params.id));
      setBlog(foundBlog || null);
    }
  }, [params.id]);

  if (!blog) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-center text-gray-600">Blog not found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{blog.date}</p>
      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
    </main>
  );
}
