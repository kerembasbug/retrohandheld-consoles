import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProductsByCR,
  getCommunityFavorites,
  getEditorsPicks,
  getBudgetFriendly,
  getPremiumProducts,
  getProductsByCategoryLimited,
  categories,
} from "@/data/products";
import { mainCategories } from "@/data/categories";
import ProductCollection from "@/components/ProductCollection";

export const metadata: Metadata = {
  title: "Best Retro Handheld Game Consoles 2025 - Top Portable Gaming Devices",
  description:
    "Discover the best retro handheld game consoles in 2025. Compare top portable gaming devices with 1000s of preloaded games, high-quality displays, and long battery life. Find your perfect retro gaming console today.",
  keywords: [
    "retro handheld game console",
    "portable game console",
    "retro gaming console",
    "handheld emulator",
    "best retro game console",
    "portable gaming device",
    "classic game console",
    "handheld video games"
  ],
  openGraph: {
    title: "Best Retro Handheld Game Consoles 2025",
    description: "Top-rated retro handheld game consoles with thousands of preloaded classic games. Compare features, prices, and reviews.",
    type: "website",
  },
  alternates: {
    canonical: "https://retrohandheldconsoles.com/",
  },
};

export default function Home() {
  // Track used products to avoid duplicates
  const usedAsins = new Set<string>();
  
  // Get collections with unique products
  const crProducts = getProductsByCR(6);
  crProducts.forEach(p => usedAsins.add(p.asin));
  
  const communityFavorites = getCommunityFavorites(4).filter(p => !usedAsins.has(p.asin));
  communityFavorites.forEach(p => usedAsins.add(p.asin));
  
  const editorsPicks = getEditorsPicks(5).filter(p => !usedAsins.has(p.asin));
  editorsPicks.forEach(p => usedAsins.add(p.asin));
  
  const budgetFriendly = getBudgetFriendly(4).filter(p => !usedAsins.has(p.asin));
  budgetFriendly.forEach(p => usedAsins.add(p.asin));
  
  const premiumProducts = getPremiumProducts(4).filter(p => !usedAsins.has(p.asin));
  premiumProducts.forEach(p => usedAsins.add(p.asin));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🎮 Retro Gaming Community
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Best Retro Handheld Consoles 2025
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of retro gaming enthusiasts. Discover expert reviews, detailed guides, and find your perfect portable gaming companion.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-100">Consoles Reviewed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-blue-100">Community Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-blue-100">Expert Guides</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Pick - Featured Layout */}
      {editorsPicks.length > 0 && (
        <ProductCollection
          title="Editor's Pick"
          subtitle="Our team's top recommendations for the best retro gaming experience"
          products={editorsPicks}
          badge="⭐ Editor's Choice"
          badgeColor="bg-yellow-500"
          layout="featured"
          viewAllLink="/products?filter=editors-pick"
        />
      )}

      {/* Community Favorites */}
      {communityFavorites.length > 0 && (
        <ProductCollection
          title="🏆 Community Favorites"
          subtitle="Most loved by our retro gaming community - based on thousands of reviews"
          products={communityFavorites}
          badge="Community Choice"
          badgeColor="bg-purple-600"
          viewAllLink="/products?filter=community-favorites"
        />
      )}

      {/* Top Rated Products */}
      {crProducts.length > 0 && (
        <ProductCollection
          title="⭐ Top Rated Consoles"
          subtitle="Highest rated retro handhelds with thousands of positive reviews"
          products={crProducts}
          badge="Best Sellers"
          badgeColor="bg-red-600"
          viewAllLink="/products?filter=top-rated"
        />
      )}

      {/* Category Collections */}
      {mainCategories.slice(0, 3).map((category) => {
        const categoryProducts = getProductsByCategoryLimited(category.slug, 4, usedAsins);
        categoryProducts.forEach(p => usedAsins.add(p.asin));
        
        if (categoryProducts.length === 0) return null;
        
        return (
          <ProductCollection
            key={category.slug}
            title={`Best ${category.name}`}
            subtitle={`Top-rated ${category.name.toLowerCase()} consoles handpicked by our experts`}
            products={categoryProducts}
            badge={category.name}
            badgeColor="bg-blue-600"
            viewAllLink={`/category/${category.slug}`}
          />
        );
      })}

      {/* Budget Friendly */}
      {budgetFriendly.length > 0 && (
        <ProductCollection
          title="💰 Budget-Friendly Picks"
          subtitle="Great value retro handhelds under $100"
          products={budgetFriendly}
          badge="Best Value"
          badgeColor="bg-green-600"
          viewAllLink="/products?filter=budget"
        />
      )}

      {/* Premium Products */}
      {premiumProducts.length > 0 && (
        <ProductCollection
          title="💎 Premium Collection"
          subtitle="High-end retro handheld consoles for serious gamers"
          products={premiumProducts}
          badge="Premium"
          badgeColor="bg-purple-600"
          viewAllLink="/products?filter=premium"
        />
      )}

      {/* Guides & Comparisons Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Expert Guides & Comparisons</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              In-depth reviews, detailed guides, and comprehensive comparisons to help you make the best choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Comparison Articles */}
            <Link
              href="/guides/comparison"
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Head-to-Head Comparisons
              </h3>
              <p className="text-gray-600 mb-4">
                Detailed side-by-side comparisons of popular retro handheld consoles
              </p>
              <span className="text-blue-600 font-semibold group-hover:underline">
                Read Comparisons →
              </span>
            </Link>

            {/* Buying Guides */}
            <Link
              href="/guides/buying-guide"
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Complete Buying Guide
              </h3>
              <p className="text-gray-600 mb-4">
                Everything you need to know before buying your first retro handheld
              </p>
              <span className="text-blue-600 font-semibold group-hover:underline">
                Read Guide →
              </span>
            </Link>

            {/* Setup Guides */}
            <Link
              href="/guides/setup"
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Setup & Configuration
              </h3>
              <p className="text-gray-600 mb-4">
                Step-by-step guides to get the most out of your retro handheld
              </p>
              <span className="text-blue-600 font-semibold group-hover:underline">
                View Guides →
              </span>
            </Link>

            {/* Game Recommendations */}
            <Link
              href="/guides/games"
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Best Games to Play
              </h3>
              <p className="text-gray-600 mb-4">
                Curated lists of the best retro games for each console
              </p>
              <span className="text-blue-600 font-semibold group-hover:underline">
                Explore Games →
              </span>
            </Link>

            {/* Maintenance Tips */}
            <Link
              href="/guides/maintenance"
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Maintenance & Care
              </h3>
              <p className="text-gray-600 mb-4">
                Tips to keep your retro handheld in perfect condition
              </p>
              <span className="text-blue-600 font-semibold group-hover:underline">
                Learn More →
              </span>
            </Link>

            {/* Community Reviews */}
            <Link
              href="/community/reviews"
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Community Reviews
              </h3>
              <p className="text-gray-600 mb-4">
                Real reviews and experiences from our gaming community
              </p>
              <span className="text-blue-600 font-semibold group-hover:underline">
                Read Reviews →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Retro Gaming Community</h2>
          <p className="text-xl text-blue-100 mb-8">
            Share your experiences, get recommendations, and connect with fellow retro gaming enthusiasts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/community"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Join Community
            </Link>
            <Link
              href="/guides"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors border-2 border-white/20"
            >
              Browse All Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
