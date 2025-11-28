'use client';

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, categories } from "@/data/products";
import { getSafeImageUrl } from "@/lib/imageUtils";
import ProductFilters from "@/components/ProductFilters";
import type { Product } from "@/data/products";

function appendPartnerTag(url: string): string {
  const partnerTag = process.env.AMAZON_PARTNER_TAG || "your-tag-20";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}tag=${partnerTag}`;
}

type FilterState = {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  minReviews: string;
  sortBy: 'rating' | 'price-low' | 'price-high' | 'reviews' | 'name';
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    minReviews: '',
    sortBy: 'rating',
  });

  // Get unique categories and brands
  const availableCategories = useMemo(() => {
    return Object.keys(categories).sort();
  }, []);

  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(p => {
      if (p.brand && p.brand.trim() !== '' && p.brand !== 'N/A' && !p.brand.includes('Brand') && p.brand.length < 50) {
        brands.add(p.brand.trim());
      }
    });
    return Array.from(brands).sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

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
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Retro Handheld Game Consoles
          </h1>
          <p className="text-lg text-gray-600">
            Browse our complete collection of {products.length} retro handheld game consoles. Compare features, prices, and reviews to find your perfect gaming device.
          </p>
        </div>

        {/* Filters */}
        <ProductFilters
          products={products}
          filteredProducts={filteredProducts}
          filters={filters}
          onFiltersChange={setFilters}
          categories={availableCategories}
          brands={availableBrands}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
                </div>
              </Link>
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded capitalize mb-2">
                    {product.category.replace('-', ' ')}
                  </span>
                </div>
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
      </div>
    </div>
  );
}

