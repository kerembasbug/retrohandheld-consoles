# Retro Handheld Game Consoles - Affiliate Website

Modern, SEO-optimized affiliate website for retro handheld game consoles built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- 🎮 **Product Collections**: Curated collections with high conversion rates
- 🔍 **Advanced Filtering**: Filter by category, brand, price, rating, and reviews
- 📱 **Responsive Design**: Mobile-first, modern UI/UX
- ⚡ **Performance**: Optimized images, fast loading times
- 🎯 **SEO Optimized**: Meta tags, sitemap, structured data
- 🏆 **Community Focus**: Editor's picks, community favorites
- 📖 **Guides & Comparisons**: Expert guides and detailed comparisons

## Tech Stack

- **Framework**: Next.js 16.0.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Zeabur

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
AMAZON_PARTNER_TAG=your-tag-20
AMAZON_ACCESS_KEY=your-access-key
AMAZON_SECRET_KEY=your-secret-key
```

## Project Structure

```
retrohandheld/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── data/            # Product data and categories
│   └── lib/             # Utility functions
├── parse_csv_products.js # CSV parser script
└── public/              # Static assets
```

## Deployment

### Zeabur

1. Link project: `zeabur link`
2. Add environment variables: `zeabur env add AMAZON_PARTNER_TAG=...`
3. Deploy: `zeabur deploy`

## License

Private project - All rights reserved
