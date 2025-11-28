'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/data/products';

type FilterState = {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  minReviews: string;
  sortBy: 'rating' | 'price-low' | 'price-high' | 'reviews' | 'name';
};

type ProductFiltersProps = {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
};

export default function ProductFilters({
  products,
  filteredProducts,
  filters,
  onFiltersChange,
  categories,
  brands,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      minReviews: '',
      sortBy: 'rating',
    });
  };

  const hasActiveFilters = 
    filters.category !== '' ||
    filters.brand !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.minRating !== '' ||
    filters.minReviews !== '';

  return (
    <div className="mb-8">
      {/* Mobile: Collapsible Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-between hover:bg-blue-50 transition-colors"
        >
          <span>🔍 Filters ({filteredProducts.length} products)</span>
          <span className={isOpen ? 'rotate-180' : ''}>▼</span>
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-lg p-6 border border-gray-200`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filter Products</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand
            </label>
            <select
              value={filters.brand}
              onChange={(e) => updateFilter('brand', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
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
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <input
                type="number"
                placeholder="Max $"
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
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
              onChange={(e) => updateFilter('minRating', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4.0">4.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
              <option value="3.0">3.0+ ⭐</option>
            </select>
          </div>

          {/* Min Reviews */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Reviews
            </label>
            <select
              value={filters.minReviews}
              onChange={(e) => updateFilter('minReviews', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Reviews</option>
              <option value="1000">1,000+</option>
              <option value="500">500+</option>
              <option value="100">100+</option>
              <option value="50">50+</option>
              <option value="10">10+</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
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
            <span className="font-bold">{products.length}</span> products
          </p>
        </div>
      </div>
    </div>
  );
}

