/**
 * Validates if a string is a valid image URL
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Check if it's a valid URL starting with http/https
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }

  // Check if it looks like an image URL (contains image-related extensions or Amazon media URL)
  const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
  const isAmazonMedia = url.includes('media-amazon.com') || url.includes('amazon.com/images');
  
  return hasImageExtension || isAmazonMedia;
}

/**
 * Gets a safe image URL, falling back to a placeholder if invalid
 */
export function getSafeImageUrl(imageUrl: string | null | undefined, fallback?: string): string {
  // Use a data URI SVG placeholder instead of external service
  const defaultFallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
  
  if (isValidImageUrl(imageUrl)) {
    return imageUrl;
  }
  
  return fallback || defaultFallback;
}


