import Image from "next/image";
import Link from "next/link";
import { getSafeImageUrl } from "@/lib/imageUtils";
import { appendPartnerTag } from "@/lib/amazonUtils";
import type { Product } from "@/data/products";

type ProductCollectionProps = {
  title: string;
  subtitle?: string;
  products: Product[];
  badge?: string;
  badgeColor?: string;
  viewAllLink?: string;
  layout?: "grid" | "featured";
};

export default function ProductCollection({
  title,
  subtitle,
  products,
  badge,
  badgeColor = "bg-blue-600",
  viewAllLink,
  layout = "grid",
}: ProductCollectionProps) {
  if (products.length === 0) return null;

  if (layout === "featured") {
    const [featured, ...others] = products;
    
    return (
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              {badge && (
                <span className={`inline-block ${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                  {badge}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
              {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
            </div>
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="hidden md:block text-blue-600 hover:text-blue-800 font-semibold"
              >
                View All →
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Product - Large */}
            <Link
              href={`/product/${featured.asin}`}
              className="lg:col-span-2 group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 bg-gray-100">
                <Image
                  src={getSafeImageUrl(featured.image)}
                  alt={featured.title}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold">
                  Editor's Choice
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {featured.title}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(featured.rating) ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">
                    {featured.rating.toFixed(1)} ({featured.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">${featured.price}</span>
                  <span className="text-blue-600 font-semibold">View Details →</span>
                </div>
              </div>
            </Link>

            {/* Other Products - Small Grid */}
            <div className="space-y-4">
              {others.map((product) => (
                <Link
                  key={product.asin}
                  href={`/product/${product.asin}`}
                  className="group flex gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={getSafeImageUrl(product.image)}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">
                      {product.title.length > 60 ? `${product.title.substring(0, 60)}...` : product.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Grid Layout
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            {badge && (
              <span className={`inline-block ${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                {badge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="hidden md:block text-blue-600 hover:text-blue-800 font-semibold"
            >
              View All →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.asin}
              className="product-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              <Link href={`/product/${product.asin}`} className="block">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={getSafeImageUrl(product.image)}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.asin}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] hover:text-blue-600 transition-colors text-sm">
                    {product.title.length > 70 ? `${product.title.substring(0, 70)}...` : product.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-blue-600">${product.price}</span>
                </div>
                <a
                  href={appendPartnerTag(product.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold transition-colors text-sm"
                >
                  View on Amazon →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

