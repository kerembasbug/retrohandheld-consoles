import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Best Retro Handheld Game Consoles 2025 - Top Portable Gaming Devices",
  description:
    "Discover the best retro handheld game consoles in 2025. Compare top portable gaming devices with 1000s of preloaded games, high-quality displays, and long battery life. Find your perfect retro gaming console today.",
  metadataBase: new URL("https://retrohandheldconsoles.com"),
  keywords: [
    "retro handheld game console",
    "portable game console",
    "retro gaming console",
    "handheld emulator",
    "retro game console",
    "portable gaming device",
    "classic game console",
    "handheld video games"
  ],
  openGraph: {
    title: "Best Retro Handheld Game Consoles 2025",
    description: "Top-rated retro handheld game consoles with thousands of preloaded classic games. Compare features, prices, and reviews.",
    type: "website",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

