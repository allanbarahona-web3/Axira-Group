# Axira Group – Advisory & Property Services

A premium static website built with Next.js App Router, TypeScript, and Tailwind CSS.

## 🏗️ Phase 1 Foundation

This is the Phase 1 implementation providing:

- ✅ Modular architecture ready for backend integration
- ✅ Multi-language support (EN, ES, DE, PT)
- ✅ Premium design with deep blue + gold palette
- ✅ Responsive layout and components
- ✅ Real estate property showcase
- ✅ Service pages for all offerings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The default route redirects to `/en` (English).

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Locale-based routing
│   │   ├── layout.tsx       # Locale layout with Header/Footer
│   │   ├── page.tsx         # Home page
│   │   ├── services/        # Services pages
│   │   ├── real-estate/     # Real estate pages
│   │   ├── about/           # About page
│   │   └── contact/         # Contact page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles & design system
├── components/
│   ├── layout/              # Header, Footer
│   ├── sections/            # Hero, etc.
│   └── ui/                  # WhatsAppBubble, LanguageSwitcher
├── config/
│   └── site.ts              # Centralized site configuration
├── i18n/
│   ├── messages/            # Translation files (en, es, de, pt)
│   └── utils.ts             # i18n utilities
└── modules/
    └── real-estate/         # Real estate data layer
        ├── types.ts         # Property types
        ├── provider.ts      # Data provider (Sanity + mock fallback)
        ├── sanityClient.ts  # Sanity client configuration
        ├── sanityQueries.ts # GROQ queries
        └── sanityMapper.ts  # Maps Sanity docs to Property type

sanity-schema/               # Sanity CMS schema (for separate Studio)
├── property.schema.ts       # Property schema definition
├── index.ts                 # Schema exports
├── package.json             # Schema dependencies
└── README.md                # Complete Sanity setup guide
```

## 🎨 Design System

The site uses a premium color palette defined in [globals.css](src/app/globals.css):

- **Primary**: Deep Blue (#112f59)
- **Accent**: Gold (#b8860b)
- **Neutrals**: Gray scale for text and backgrounds

Custom Tailwind utilities:
- `.container-custom` - Max-width container with padding
- `.section-padding` - Consistent vertical spacing
- `.btn-primary`, `.btn-accent`, `.btn-outline` - Button variants

## 🌍 Internationalization

Manual i18n implementation with URL-based locale switching:

- Routes: `/{locale}/...` (e.g., `/en/services`, `/es/servicios`)
- Default locale: `en`
- Supported: English, Spanish, German, Portuguese
- Language switcher in header
- Translation files in `src/i18n/messages/`

## 🏠 Real Estate Module

**Integrated with Sanity CMS** with mock data fallback:

- Sanity CMS integration for content management
- Mock provider fallback when Sanity is not configured
- Property types with status tracking (available, reserved, sold)
- Image optimization with Sanity Image URL builder
- **Complete setup guide**: See [sanity-schema/README.md](sanity-schema/README.md)

### Quick Start with Sanity

1. Follow the step-by-step guide in [sanity-schema/README.md](sanity-schema/README.md)
2. Create a separate Sanity Studio project
3. Copy the schema from `sanity-schema/` folder
4. Add 2 sample properties (Dubai examples provided in guide)
5. Copy credentials to `.env.local`
6. Restart Next.js dev server

### Development Without Sanity

The site works perfectly without Sanity configuration - it automatically uses mock data. No setup required for development!

## 📞 Contact Integration

- WhatsApp bubble (fixed bottom-right)
- WhatsApp number: +447735701311
- Email: info@axiragroup.com

## 🔧 Configuration

All site configuration in [src/config/site.ts](src/config/site.ts):

- Brand name and tagline
- Contact information
- Navigation structure
- Locale settings

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

For static export (optional), uncomment `output: 'export'` in `next.config.js`.

## 🎯 Phase 2 Roadmap

- [x] Sanity CMS integration
- [ ] Contact form with email service
- [ ] Image optimization and CDN
- [ ] SEO enhancements
- [ ] Analytics integration
- [ ] Performance optimization

## 📝 License

Private - Axira Group © 2026
