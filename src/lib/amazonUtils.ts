/**
 * Amazon affiliate link utilities
 */

/**
 * Appends or updates Amazon partner tag in URL
 * Handles existing query parameters correctly
 */
export function appendPartnerTag(url: string): string {
  try {
    const partnerTag = process.env.AMAZON_PARTNER_TAG || process.env.NEXT_PUBLIC_AMAZON_PARTNER_TAG || "your-tag-20";
    
    // Parse URL
    const parsedUrl = new URL(url);
    
    // Set or update tag parameter
    parsedUrl.searchParams.set("tag", partnerTag);
    
    return parsedUrl.toString();
  } catch (error) {
    // If URL parsing fails, try simple string manipulation
    console.warn("Failed to parse URL:", url, error);
    
    const partnerTag = process.env.AMAZON_PARTNER_TAG || process.env.NEXT_PUBLIC_AMAZON_PARTNER_TAG || "your-tag-20";
    
    // Remove existing tag parameter if present
    let cleanUrl = url.replace(/[?&]tag=[^&]*/g, '');
    
    // Add tag parameter
    const separator = cleanUrl.includes("?") ? "&" : "?";
    return `${cleanUrl}${separator}tag=${partnerTag}`;
  }
}

/**
 * Creates Amazon affiliate link from ASIN
 */
export function createAmazonLink(asin: string): string {
  const partnerTag = process.env.AMAZON_PARTNER_TAG || process.env.NEXT_PUBLIC_AMAZON_PARTNER_TAG || "your-tag-20";
  return `https://www.amazon.com/dp/${asin}?tag=${partnerTag}`;
}

