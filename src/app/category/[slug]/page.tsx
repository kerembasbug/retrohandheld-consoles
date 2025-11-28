'use client';

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory, categories, seoCategories } from "@/data/products";
import { seoCategories as seoCategoryList, mainCategories } from "@/data/categories";
import { getSafeImageUrl } from "@/lib/imageUtils";
import { appendPartnerTag } from "@/lib/amazonUtils";
import type { Product } from "@/data/products";

type FilterState = {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  minReviews: string;
  sortBy: 'rating' | 'price-low' | 'price-high' | 'reviews' | 'name';
};

export default function CategoryPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    minReviews: '',
    sortBy: 'rating',
  });

  const allCategoryProducts = getProductsByCategory(slug);
  
  // SEO kategori bilgisini bul
  const seoCategory = seoCategoryList.find(cat => cat.slug === slug);
  const mainCategory = mainCategories.find(cat => cat.slug === slug);
  const categoryName = seoCategory 
    ? seoCategory.name 
    : mainCategory
    ? mainCategory.name
    : (slug || '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

  // Get unique brands and categories for filters
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    allCategoryProducts.forEach(p => {
      if (p.brand && p.brand.trim() !== '' && p.brand !== 'N/A' && !p.brand.includes('Brand') && p.brand.length < 50) {
        brands.add(p.brand.trim());
      }
    });
    return Array.from(brands).sort();
  }, [allCategoryProducts]);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    allCategoryProducts.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [allCategoryProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...allCategoryProducts];

    // Category filter - skip in category page (we're already on a category)
    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }

    // Price filter
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min)) {
        filtered = filtered.filter(p => {
          const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
          return !isNaN(price) && price >= min;
        });
      }
    }
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter(p => {
          const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
          return !isNaN(price) && price <= max;
        });
      }
    }

    // Rating filter
    if (filters.minRating) {
      const minRating = parseFloat(filters.minRating);
      if (!isNaN(minRating)) {
        filtered = filtered.filter(p => p.rating >= minRating);
      }
    }

    // Reviews filter
    if (filters.minReviews) {
      const minReviews = parseInt(filters.minReviews);
      if (!isNaN(minReviews)) {
        filtered = filtered.filter(p => p.reviewCount >= minReviews);
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          const scoreA = a.rating * Math.log(a.reviewCount + 1);
          const scoreB = b.rating * Math.log(b.reviewCount + 1);
          return scoreB - scoreA;
        case 'price-low':
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
          return priceA - priceB;
        case 'price-high':
          const priceHighA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
          const priceHighB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
          return priceHighB - priceHighA;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allCategoryProducts, filters]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (allCategoryProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{categoryName}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {seoCategory ? categoryName : mainCategory ? categoryName : `Best ${categoryName} Consoles`}
          </h1>
          <p className="text-lg text-gray-600">
            {seoCategory 
              ? `Discover the best ${categoryName.toLowerCase()}. Compare ${allCategoryProducts.length} top-rated retro handheld game consoles with detailed reviews, prices, and feature comparisons.`
              : `Compare ${allCategoryProducts.length} top-rated ${categoryName.toLowerCase()} handheld game consoles. Find the perfect device with detailed reviews, prices, and feature comparisons.`
            }
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filter Products</h2>
              {(filters.brand || filters.minPrice || filters.maxPrice || filters.minRating || filters.minReviews) && (
                <button
                  onClick={() => setFilters({
                    category: '',
                    brand: '',
                    minPrice: '',
                    maxPrice: '',
                    minRating: '',
                    minReviews: '',
                    sortBy: 'rating',
                  })}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Brands</option>
                  {availableBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Max $"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
              </div>

              {/* Min Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.0">4.0+ ⭐</option>
                  <option value="3.5">3.5+ ⭐</option>
                  <option value="3.0">3.0+ ⭐</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold text-blue-600">{filteredProducts.length}</span> of{' '}
                <span className="font-bold">{allCategoryProducts.length}</span> products
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.asin}
                className="product-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/product/${product.asin}`} className="block">
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={getSafeImageUrl(product.image)}
                      alt={product.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {index === 0 && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                        Top Pick
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/product/${product.asin}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] hover:text-blue-600 transition-colors">
                      {product.title.length > 80 
                        ? `${product.title.substring(0, 80)}...` 
                        : product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.brand}
                    </span>
                  </div>
                  <a
                    href={appendPartnerTag(product.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results.
            </p>
            <button
              onClick={() => setFilters({
                category: '',
                brand: '',
                minPrice: '',
                maxPrice: '',
                minRating: '',
                minReviews: '',
                sortBy: 'rating',
              })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Category Description */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {seoCategory ? `About ${categoryName}` : mainCategory ? `About ${categoryName}` : `About ${categoryName} Consoles`}
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-4">
              {seoCategory 
                ? `${categoryName} are the perfect way to relive classic gaming memories. These portable devices combine nostalgic gameplay with modern technology, offering thousands of preloaded games, high-quality displays, long battery life, and ergonomic designs perfect for gaming on the go.`
                : `${categoryName} handheld game consoles offer the perfect blend of nostalgia and modern technology. These portable devices come preloaded with thousands of classic games, featuring high-quality displays, long battery life, and ergonomic designs perfect for gaming on the go.`
              }
            </p>
            <p className="mb-4">
              Whether you're looking for a budget-friendly option or a premium device with advanced features, 
              our curated selection includes the best {categoryName.toLowerCase()} {seoCategory ? '' : 'consoles '}available on the market. 
              Each product has been carefully reviewed to help you make an informed decision.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              What to Look For
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Screen size and resolution for optimal gaming experience</li>
              <li>Battery life for extended gaming sessions</li>
              <li>Number of preloaded games and emulator support</li>
              <li>Build quality and ergonomic design</li>
              <li>Price point and value for money</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
