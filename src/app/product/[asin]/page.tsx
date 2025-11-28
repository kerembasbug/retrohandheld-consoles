import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByAsin, getProductsByCategory } from "@/data/products";
import { getSafeImageUrl, isValidImageUrl } from "@/lib/imageUtils";

function appendPartnerTag(url: string): string {
  const partnerTag = process.env.AMAZON_PARTNER_TAG || "your-tag-20";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}tag=${partnerTag}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ asin: string }>;
}): Promise<Metadata> {
  const { asin } = await params;
  const product = getProductByAsin(asin);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = `${product.title} - Best Price & Reviews 2025`;
  const description = product.features.length > 0
    ? product.features[0].substring(0, 160)
    : `Buy ${product.title} on Amazon. ${product.rating} star rating with ${product.reviewCount} reviews. Best price guaranteed.`;

  return {
    title,
    description,
    keywords: [
      product.title,
      "retro handheld game console",
      "portable game console",
      product.brand,
      "buy online",
      "best price",
    ],
    openGraph: {
      title,
      description,
      images: isValidImageUrl(product.image) ? [product.image] : [],
      type: "website",
    },
    alternates: {
      canonical: `https://retrohandheldconsoles.com/product/${asin}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ asin: string }>;
}) {
  const { asin } = await params;
  const product = getProductByAsin(asin);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.asin !== product.asin)
    .slice(0, 4);

  // TypeScript guard - product is guaranteed to exist after notFound() check
  const safeProduct = product;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link href={`/category/${safeProduct.category}`} className="hover:text-blue-600 capitalize">{safeProduct.category.replace('-', ' ')}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">{safeProduct.title.substring(0, 50)}...</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="relative h-96 w-full">
              <Image
                src={getSafeImageUrl(safeProduct.image)}
                alt={safeProduct.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3 capitalize">
                {safeProduct.category.replace('-', ' ')}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {safeProduct.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(safeProduct.rating)
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
                <span className="text-lg font-semibold text-gray-700">
                  {safeProduct.rating.toFixed(1)}
                </span>
                <span className="text-gray-600">
                  ({safeProduct.reviewCount.toLocaleString()} {safeProduct.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${safeProduct.price}
                </span>
                {safeProduct.price !== "Check Price" && (
                  <span className="text-sm text-gray-500">on Amazon</span>
                )}
              </div>
              <a
                href={appendPartnerTag(safeProduct.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-center py-4 rounded-lg font-bold text-lg transition-colors mb-4"
              >
                Buy on Amazon →
              </a>
              <p className="text-xs text-gray-500 text-center">
                Free shipping on orders over $25. Prime members get free 2-day shipping.
              </p>
            </div>

            {/* Key Features */}
            {safeProduct.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {safeProduct.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Specifications
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Brand</dt>
                  <dd className="text-sm font-medium text-gray-900">{safeProduct.brand}</dd>
                </div>
                {safeProduct.dimensions.weight && (
                  <div>
                    <dt className="text-sm text-gray-500">Weight</dt>
                    <dd className="text-sm font-medium text-gray-900">{safeProduct.dimensions.weight}</dd>
                  </div>
                )}
                {safeProduct.dimensions.length && (
                  <div>
                    <dt className="text-sm text-gray-500">Dimensions</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {safeProduct.dimensions.length}" × {safeProduct.dimensions.width}" × {safeProduct.dimensions.height}"
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-gray-500">ASIN</dt>
                  <dd className="text-sm font-medium text-gray-900">{safeProduct.asin}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.asin}
                  href={`/product/${related.asin}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={getSafeImageUrl(related.image)}
                      alt={related.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {related.title.length > 60 
                        ? `${related.title.substring(0, 60)}...` 
                        : related.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        ${related.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">{related.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

