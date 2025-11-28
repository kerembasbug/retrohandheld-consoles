# Retro Handheld Game Consoles - Affiliate Website

A modern, SEO-optimized affiliate website for retro handheld game consoles built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- ✅ **30+ Products** - Comprehensive collection of retro handheld game consoles
- ✅ **SEO Optimized** - Meta tags, structured data, sitemap, and robots.txt
- ✅ **Conversion Optimized** - High-converting UI/UX design with clear CTAs
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Category Pages** - Organized by console types (Retro, Linux, Android, Cloud Gaming, Kids)
- ✅ **Product Pages** - Detailed product information with reviews and specifications
- ✅ **Fast Performance** - Next.js 16 with App Router for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
```bash
# Create .env.local file
AMAZON_PARTNER_TAG=your-tag-20
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
retrohandheld/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── product/      # Product detail pages
│   │   ├── category/     # Category pages
│   │   └── ...
│   ├── components/       # React components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── data/             # Product data
│       ├── products.json # Parsed product data
│       └── products.ts    # TypeScript types and helpers
├── parse_csv_products.js # CSV parser script
└── ...
```

## Data Management

Products are parsed from CSV files using the `parse_csv_products.js` script:

```bash
node parse_csv_products.js
```

This generates `src/data/products.json` with all product information.

## SEO Features

- **Meta Tags**: Optimized title, description, and Open Graph tags
- **Structured Data**: Product schema markup
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Prevent duplicate content
- **Semantic HTML**: Proper heading hierarchy and structure

## Conversion Optimization

- **Clear CTAs**: Prominent "Buy on Amazon" buttons
- **Trust Signals**: Ratings, review counts, and badges
- **Product Images**: High-quality product photos
- **Related Products**: Cross-sell opportunities
- **Mobile Optimized**: Responsive design for all devices
- **Fast Loading**: Optimized images and code splitting

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

- `AMAZON_PARTNER_TAG`: Your Amazon Associates tag (default: "your-tag-20")

## License

This project is private and proprietary.

## Support

For questions or issues, please contact the development team.

