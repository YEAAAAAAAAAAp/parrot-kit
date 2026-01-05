# ParrotKit Landing Page

A modern, conversion-optimized landing page built with Next.js 14, TypeScript, and Tailwind CSS. Features real-time countdown timers, YouTube Shorts carousel, GA4 analytics, and behavioral validation patterns.

## Features

### Core Features
- 🎨 Beautiful gradient design with purple/pink theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Next.js 14
- 🎯 Conversion-focused layout with behavioral validation
- 🎭 Smooth animations and micro-interactions
- 📊 Comprehensive GA4 event tracking

### Advanced Features
- ⏰ **Real-time Countdown Timer**: Live timer showing days:hours:minutes:seconds until deadline
- 🎬 **YouTube Shorts Carousel**: Auto-rotating video showcase with manual navigation
- 🔥 **FOMO Elements**: Urgency messaging with dynamic spot counters
- 🎁 **Dual Conversion Paths**: Free waitlist + premium Special offer option
- 📈 **Analytics Integration**: Full GA4 tracking for funnel/cohort analysis
- 🎨 **Config-Driven Architecture**: Centralized configuration for easy updates

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL (Serverless)
- **Analytics**: Google Analytics 4 (G-FX115HN1EW)
- **Font**: Inter (Google Fonts)

## Project Structure

```
parrot-kit/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts       # Video analysis API (stub)
│   │   ├── waitlist/route.ts      # Waitlist signup endpoint
│   │   └── db-test/route.ts       # Database connection test
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout with GA4
│   └── page.tsx                   # Main page with tracking
├── components/
│   ├── Hero.tsx                   # Hero with carousel & link analysis
│   ├── FOMOWidget.tsx             # Real-time countdown & FOMO badges
│   ├── UnlockModal.tsx            # Gating modal (waitlist/Special offer)
│   ├── Pricing.tsx                # 3-tier pricing (Pro/Team/Special offer)
│   ├── OutputPreview.tsx          # Recipe breakdown preview
│   ├── HowItWorks.tsx             # 3-step process
│   ├── UseCases.tsx               # Target personas
│   ├── FAQ.tsx                    # FAQ accordion
│   ├── FinalCTA.tsx               # Bottom conversion form
│   ├── Header.tsx                 # Sticky navigation
│   └── Footer.tsx                 # Footer links
├── lib/
│   ├── landingConfig.ts           # Central configuration
│   ├── types.ts                   # TypeScript interfaces
│   ├── db.ts                      # Database client
│   └── role.ts                    # User role enum
└── public/                        # Static assets
```

## Configuration

All operational parameters are centralized in `lib/landingConfig.ts`:

```typescript
export const landingConfig = {
  // Countdown & Batch Info
  nextBatchDeadline: new Date('2026-01-08T23:59:59'),
  nextBatchInvites: 500,
  
  // Special offer
  foundingDropTotalSpots: 100,
  foundingDropSpotsLeft: 77,
  foundingDropOneTimePrice: 39,
  foundingDropDeliveryHours: 48,
  
  // Pricing
  earlyBirdProPrice: 20,
  laterProPrice: 29,
  
  // Social Proof
  creatorsJoined: '10K+',
  
  // Contact
  supportEmail: 'hello@parrotkit.com'
}
```

## Key Features Implementation

### 1. Real-Time Countdown Timer
- Located in `FOMOWidget.tsx`
- Updates every second using `setInterval`
- Displays format: `07d : 12h : 34m : 56s`
- Automatically calculates time remaining until `nextBatchDeadline`

### 2. YouTube Shorts Carousel
- Located in `Hero.tsx` (right column)
- Auto-rotates every 8 seconds
- Manual navigation via dot indicators
- Videos: 5 example shorts showcasing results
- Embedded with autoplay, muted, loop

### 3. Behavioral Validation Flow
**Link Paste → Free Teaser → Gating Modal**

1. User pastes video link in Hero
2. Stub API (`/api/analyze`) returns deterministic teaser
3. "Unlock Full Recipe" triggers modal
4. Modal offers:
   - **Free**: Join waitlist (stores rank in localStorage)
   - **Paid**: Special offer $39 (opens mailto)

### 4. GA4 Event Tracking
Tracked events:
- `page_view`, `scroll_depth` (25/50/75/100%)
- `section_view` (Intersection Observer)
- `link_paste_submit`, `teaser_view`, `unlock_full_click`
- `waitlist_submit`, `founding_drop_click`, `signup_success`
- `pricing_click`, `faq_interaction`, `navigation_click`

### 5. FOMO & Urgency Elements
- **Countdown**: "CLOSING SOON: 07d:12h:34m:56s"
- **Scarcity**: "ALMOST GONE: Only 77/100 left!"
- **Social Proof**: "Join 10K+ creators"
- **Waitlist Rank**: "You're #10,234 in line"

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon Database account (for production)

### Environment Variables

Create `.env.local`:
```bash
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Customization Guide

### Update Countdown Deadline
Edit `lib/landingConfig.ts`:
```typescript
nextBatchDeadline: new Date('2026-01-15T23:59:59')
```

### Change Special offer Spots
```typescript
foundingDropSpotsLeft: 50  // Update as spots are taken
```

### Update Video Carousel
Edit `components/Hero.tsx`:
```typescript
const exampleShorts = [
  'VIDEO_ID_1',
  'VIDEO_ID_2',
  'VIDEO_ID_3'
]
```

### Modify Pricing
```typescript
earlyBirdProPrice: 25,
laterProPrice: 39
```

## Database Schema

Required table for waitlist:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import project in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy

### Environment Variables in Vercel
- `DATABASE_URL`: Neon PostgreSQL connection string

## Analytics Setup

GA4 is pre-configured with ID: `G-FX115HN1EW`

To use your own:
1. Edit `app/layout.tsx`
2. Replace measurement ID
3. Redeploy

## Performance Optimizations

- ✅ Next.js 14 App Router for optimal loading
- ✅ Tailwind CSS for minimal bundle size
- ✅ Image optimization ready
- ✅ Server Components where possible
- ✅ Client Components only for interactivity

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a production landing page. For bug reports or feature requests, please open an issue.

## License

MIT

## Support

For questions: hello@parrotkit.com

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your site will be live!

### Method 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Next.js and deploy

### Method 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_URL)

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Content

All content is in the component files under `/components`:

- `Hero.tsx` - Main headline and CTA
- `HowItWorks.tsx` - 3-step process
- `OutputPreview.tsx` - Recipe preview
- `Pricing.tsx` - Pricing plans
- `FAQ.tsx` - Frequently asked questions
- etc.

### Adding Email Collection

To actually collect emails, integrate with:

- **Mailchimp**: https://mailchimp.com
- **ConvertKit**: https://convertkit.com
- **EmailOctopus**: https://emailoctopus.com
- **Supabase**: https://supabase.com (for database)

Update the `handleSubmit` function in `FinalCTA.tsx` to send data to your backend.

## Project Structure

```
parrot-kit-landing/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/           # All React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── Problem.tsx
│   ├── HowItWorks.tsx
│   ├── OutputPreview.tsx
│   ├── UseCases.tsx
│   ├── WhyUs.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── FinalCTA.tsx
│   └── Footer.tsx
├── public/              # Static assets
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
└── tsconfig.json        # TypeScript config
```

## Performance

This landing page is optimized for:

- Fast loading times
- Good Core Web Vitals
- SEO-friendly structure
- Mobile performance

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
