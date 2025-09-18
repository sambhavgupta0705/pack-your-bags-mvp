import "./globals.css";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pack Your Bags",
  description: "Compare Himalayan treks and providers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
