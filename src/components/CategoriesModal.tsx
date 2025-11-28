'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { mainCategories, seoCategories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';

type CategoriesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const categoryIcons: Record<string, string> = {
  'retro-handheld': '🎮',
  'linux-handheld': '🐧',
  'android-handheld': '🤖',
  'cloud-gaming': '☁️',
  'kids-handheld': '👶',
  'handheld-consoles': '📱',
};

const getCategoryIcon = (slug: string): string => {
  return categoryIcons[slug] || '🎯';
};

export default function CategoriesModal({ isOpen, onClose }: CategoriesModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden pointer-events-auto zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
                <p className="text-blue-100">Explore our collection of retro handheld consoles</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Main Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                Main Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainCategories.map((category) => {
                  const products = getProductsByCategory(category.slug);
                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={onClose}
                      className="group relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-transparent hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl group-hover:scale-110 transition-transform">
                          {getCategoryIcon(category.slug)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {products.length} {products.length === 1 ? 'product' : 'products'}
                          </p>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* SEO Categories */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                Browse by Type
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {seoCategories.map((category) => {
                  const products = getProductsByCategory(category.slug);
                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={onClose}
                      className="group bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {category.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {products.length} {products.length === 1 ? 'item' : 'items'}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Can't find what you're looking for?{' '}
              <Link href="/products" onClick={onClose} className="text-blue-600 hover:underline font-semibold">
                Browse all products
              </Link>
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

