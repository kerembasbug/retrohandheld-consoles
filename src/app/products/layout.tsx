import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Retro Handheld Game Consoles - Complete Product List",
  description:
    "Browse our complete collection of retro handheld game consoles. Compare all products, prices, ratings, and features in one place.",
  keywords: [
    "retro handheld game console",
    "all handheld consoles",
    "portable game console list",
    "retro gaming devices",
  ],
  openGraph: {
    title: "All Retro Handheld Game Consoles",
    description: "Complete collection of retro handheld game consoles with reviews and comparisons.",
    type: "website",
  },
  alternates: {
    canonical: "https://retrohandheldconsoles.com/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

