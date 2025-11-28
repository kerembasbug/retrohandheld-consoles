import productsData from './products.json';

export type Product = {
  asin: string;
  title: string;
  price: string;
  rating: number;
  reviewCount: number;
  image: string;
  url: string;
  description: string;
  brand: string;
  category: string;
  seoCategories?: string[];
  features: string[];
  dimensions: {
    length: string;
    width: string;
    height: string;
    weight: string;
  };
};

export const products: Product[] = productsData.products as Product[];

export const categories = (productsData.categories || {}) as Record<string, Product[]>;
export const seoCategories = (productsData.seoCategories || {}) as Record<string, Product[]>;

export function getProductByAsin(asin: string): Product | undefined {
  return products.find(p => p.asin === asin);
}

export function getProductsByCategory(category: string): Product[] {
  // Önce ana kategorilerde ara
  if (categories[category]) {
    return categories[category];
  }
  // Sonra SEO kategorilerinde ara
  if (seoCategories[category]) {
    return seoCategories[category];
  }
  
  // SEO kategori için akıllı filtreleme - her kategori farklı kriterlere göre ürün seçer
  return getProductsBySEOCategory(category);
}

// SEO kategorileri için akıllı filtreleme - her kategori farklı ürünler gösterir
function getProductsBySEOCategory(categorySlug: string): Product[] {
  let filtered: Product[] = [...products];
  
  // Kategori bazlı filtreleme kuralları
  if (categorySlug.includes('best-handheld') || categorySlug.includes('best-retro')) {
    // En yüksek rating + çok review
    filtered = filtered
      .filter(p => p.rating >= 4.0 && p.reviewCount >= 50)
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  } else if (categorySlug.includes('budget') || categorySlug.includes('cheap')) {
    // Düşük fiyat
    filtered = filtered
      .filter(p => {
        const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
        return price > 0 && price < 80 && p.rating >= 3.5;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
      });
  } else if (categorySlug.includes('premium') || categorySlug.includes('high-end')) {
    // Yüksek fiyat + yüksek rating
    filtered = filtered
      .filter(p => {
        const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
        return price >= 150 && p.rating >= 4.0;
      })
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  } else if (categorySlug.includes('portable') || categorySlug.includes('compact')) {
    // Küçük boyut (title'da "mini", "small", "compact" geçenler)
    filtered = filtered
      .filter(p => {
        const text = p.title.toLowerCase();
        return text.includes('mini') || text.includes('small') || text.includes('compact') || 
               text.includes('3.') || text.includes('3.5') || text.includes('3.0');
      })
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  } else if (categorySlug.includes('android')) {
    // Android işletim sistemi
    filtered = filtered
      .filter(p => {
        const text = `${p.title} ${p.description}`.toLowerCase();
        return text.includes('android') || p.category === 'android-handheld';
      })
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  } else if (categorySlug.includes('linux')) {
    // Linux işletim sistemi
    filtered = filtered
      .filter(p => {
        const text = `${p.title} ${p.description}`.toLowerCase();
        return text.includes('linux') || text.includes('emuelec') || p.category === 'linux-handheld';
      })
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  } else if (categorySlug.includes('kids') || categorySlug.includes('children')) {
    // Çocuklar için
    filtered = filtered
      .filter(p => {
        const text = `${p.title} ${p.description}`.toLowerCase();
        return text.includes('kids') || text.includes('children') || text.includes('toy') || 
               p.category === 'kids-handheld';
      })
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  } else if (categorySlug.includes('games') && !categorySlug.includes('handheld-games')) {
    // Çok oyun içerenler
    filtered = filtered
      .filter(p => {
        const text = `${p.title} ${p.description}`.toLowerCase();
        return text.match(/\d{3,}\+?\s*games?/i) || text.includes('10000') || text.includes('15000');
      })
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  } else {
    // Varsayılan: En yüksek rating
    filtered = filtered
      .filter(p => p.rating >= 3.5 && p.reviewCount >= 10)
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      });
  }
  
  return filtered;
}

export function getTopRatedProducts(limit: number = 10): Product[] {
  return [...products]
    .filter(p => p.rating >= 3.5 && p.reviewCount >= 10)
    .sort((a, b) => {
      // Sort by rating * reviewCount (weighted score)
      const scoreA = a.rating * Math.log(a.reviewCount + 1);
      const scoreB = b.rating * Math.log(b.reviewCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function getFeaturedProducts(limit: number = 6): Product[] {
  return getTopRatedProducts(limit);
}

// Get products by conversion rate score (rating * reviewCount)
export function getProductsByCR(limit: number = 6): Product[] {
  return [...products]
    .filter(p => p.rating >= 3.5 && p.reviewCount >= 10)
    .sort((a, b) => {
      const crA = a.rating * Math.log(a.reviewCount + 1);
      const crB = b.rating * Math.log(b.reviewCount + 1);
      return crB - crA;
    })
    .slice(0, limit);
}

// Get community favorites (most reviewed)
export function getCommunityFavorites(limit: number = 4): Product[] {
  return [...products]
    .filter(p => p.reviewCount >= 50)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

// Get editor's picks (high rating + good reviews)
export function getEditorsPicks(limit: number = 4): Product[] {
  return [...products]
    .filter(p => p.rating >= 4.3 && p.reviewCount >= 20)
    .sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1);
      const scoreB = b.rating * Math.log(b.reviewCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

// Get budget-friendly products
export function getBudgetFriendly(limit: number = 4): Product[] {
  return [...products]
    .filter(p => {
      const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
      return price > 0 && price < 100 && p.rating >= 3.5;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
      return priceA - priceB;
    })
    .slice(0, limit);
}

// Get premium products
export function getPremiumProducts(limit: number = 4): Product[] {
  return [...products]
    .filter(p => {
      const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
      return price >= 200 && p.rating >= 4.0;
    })
    .sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1);
      const scoreB = b.rating * Math.log(b.reviewCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

// Get products by category (limited, no duplicates)
export function getProductsByCategoryLimited(category: string, limit: number = 4, excludeAsins: Set<string> = new Set()): Product[] {
  const categoryProducts = getProductsByCategory(category);
  return categoryProducts
    .filter(p => !excludeAsins.has(p.asin))
    .sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1);
      const scoreB = b.rating * Math.log(b.reviewCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

