# ParrotKit Landing Page

A modern, conversion-optimized landing page with **real-time analytics dashboard**. Built with Next.js 14, TypeScript, Tailwind CSS, and Neon PostgreSQL. Track CTR, CVR, and user behavior out of the box.

> **📊 New**: Full analytics dashboard at `/admin` with Chart.js visualizations, CTR/CVR tracking, and conversion funnel analysis!

## Features

### Core Features
- 🎨 Beautiful gradient design with purple/pink theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Next.js 14
- 🎯 Conversion-focused layout with behavioral validation
- 🎭 Smooth animations and micro-interactions
- 📊 Comprehensive GA4 event tracking

### Landing Page Features
- ⏰ **Real-time Countdown Timer**: Live timer showing days:hours:minutes:seconds until deadline
- 🎬 **YouTube Shorts Carousel**: Auto-rotating video showcase with manual navigation
- 🔥 **FOMO Elements**: Urgency messaging with dynamic spot counters
- 🎁 **Dual Conversion Paths**: Free waitlist + premium Special offer option
- 📈 **Analytics Integration**: Full GA4 tracking for funnel/cohort analysis
- 🎨 **Config-Driven Architecture**: Centralized configuration for easy updates

### 📊 Analytics Dashboard Features (NEW!)
- **Admin Dashboard** at `/admin` with real-time metrics
- **CTR/CVR Tracking**: Click-through rate and conversion rate calculations
- **Chart Visualizations**: Line, bar, and pie charts with Chart.js
- **Conversion Funnel**: Track user journey from page view → analyze → waitlist → founding drop
- **Session Tracking**: Automatic session and user ID management
- **Device/Browser Analytics**: Traffic source and device breakdown
- **Auto-refresh**: Dashboard updates every 30 seconds
- **19+ Tracked Events**: Page views, CTA clicks, scroll depth, form submits, etc.

## Tech Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL (Serverless)
- **Analytics**: 
  - Google Analytics 4 (G-FX115HN1EW)
  - Custom analytics with Chart.js 4.4.1
- **Charts**: react-chartjs-2 for data visualization
- **Font**: Inter (Google Fonts)

## Project Structure

```
parrot-kit/
├── app/
│   ├── admin/
│   │   └── page.tsx               # 📊 Analytics dashboard (NEW!)
│   ├── api/
│   │   ├── analytics/             # Analytics endpoints (NEW!)
│   │   │   ├── track/route.ts     # Event tracking
│   │   │   ├── pageview/route.ts  # Page view tracking
│   │   │   ├── funnel/route.ts    # Conversion funnel
│   │   │   └── stats/route.ts     # Analytics stats
│   │   ├── analyze/route.ts       # Video analysis API (stub)
│   │   ├── waitlist/route.ts      # Waitlist signup endpoint
│   │   └── db-test/route.ts       # Database connection test
│   ├── globals.css                # Global styles + Chart.js
│   ├── layout.tsx                 # Root layout with GA4
│   └── page.tsx                   # Main page with tracking
├── components/
│   ├── Hero.tsx                   # Hero with blur effect (UPDATED!)
│   ├── FOMOWidget.tsx             # Real-time countdown & FOMO badges
│   ├── UnlockModal.tsx            # Gating modal (waitlist/Special offer)
│   ├── Pricing.tsx                # 3-tier pricing (Pro/Team/Special offer)
│   ├── OutputPreview.tsx          # Recipe breakdown preview
│   ├── HowItWorks.tsx             # 3-step process
│   ├── UseCases.tsx               # Target personas
│   ├── FAQ.tsx                    # FAQ accordion
│   ├── FinalCTA.tsx               # Bottom conversion form
│   ├── Header.tsx                 # Sticky navigation
│   ├── Footer.tsx                 # Footer links
│   ├── Problem.tsx                # Problem/solution section
│   ├── SocialProof.tsx            # Social proof badges
│   └── WhyUs.tsx                  # Value propositions
├── lib/
│   ├── analytics.ts               # 🎯 Client-side tracking utilities (NEW!)
│   ├── landingConfig.ts           # Central configuration (UPDATED!)
│   ├── types.ts                   # TypeScript interfaces
│   ├── db.ts                      # Database client
│   └── role.ts                    # User role enum
├── scripts/
│   └── setup-analytics.mjs        # 🔧 Database setup script (NEW!)
└── public/                        # Static assets
```
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
  foundingDropOneTimePrice: 0,    // Changed from 39 to 0 (FREE!)
  foundingDropDeliveryHours: 48,
  
  // Pricing
  earlyBirdProPrice: 20,
  laterProPrice: 29,
  
  // Social Proof
  creatorsJoined: '10K+',
  
  // Contact (UPDATED!)
  supportEmail: 'parrotkit.contact@gmail.com'  // Changed from hello@parrotkit.com
}
```

## Key Features Implementation

### 1. Analytics Dashboard (NEW!)
- **Location**: `/admin` route
- **Features**:
  - Summary cards: Page views, sessions, conversions, CTR, CVR, bounce rate
  - Chart.js visualizations: Line charts, bar charts, pie charts
  - Top pages and top CTAs tables
  - Conversion funnel visualization
  - Auto-refresh every 30 seconds
- **CTR Formula**: `(Total CTA Clicks / Total Page Views) × 100`
- **CVR Formula**: `(Total Conversions / Total Sessions) × 100`
- **Access**: Navigate to `http://localhost:3000/admin`

### 2. Event Tracking System (NEW!)
- **Location**: `lib/analytics.ts`
- **Capabilities**:
  - Automatic session ID generation (stored in sessionStorage)
  - Persistent user ID (stored in localStorage)
  - Track page views, CTA clicks, form submits, scroll depth
  - Device/browser/traffic source detection
  - 19+ tracked events
- **Usage**:
  ```typescript
  import { analytics } from '@/lib/analytics'
  analytics.trackCTAClick('pricing_hero', 'hero')
  ```

### 3. Real-Time Countdown Timer
- Located in `FOMOWidget.tsx`
- Updates every second using `setInterval`
- Displays format: `07d : 12h : 34m : 56s`
- Automatically calculates time remaining until `nextBatchDeadline`

### 4. YouTube Shorts Carousel
- Located in `Hero.tsx` (right column)
- Auto-rotates every 8 seconds
- Manual navigation via dot indicators
- Videos: 5 example shorts showcasing results
- Embedded with autoplay, muted, loop

### 5. Blur Effect on Analysis Results (NEW!)
**Link Paste → Analysis → Blurred Results → Unlock Modal**

1. User pastes video link in Hero
2. Stub API (`/api/analyze`) returns deterministic teaser
3. Results displayed with **blur effect** (`blur-md` filter)
4. Overlay message: "🔓 Join 500 waitlisters to unlock full recipe"
5. "Unlock Full Recipe" button triggers modal
6. Modal offers:
   - **Free**: Join waitlist (stores rank in localStorage)
   - **Founding Drop**: FREE early access (was $20, now FREE!)

### 6. Behavioral Validation Flow
**Link Paste → Free Teaser → Gating Modal**

1. User pastes video link in Hero
2. Stub API (`/api/analyze`) returns deterministic teaser
3. "Unlock Full Recipe" triggers modal
4. Modal offers:
   - **Free**: Join waitlist (stores rank in localStorage)
   - **Paid**: Special offer $39 (opens mailto)

### 7. GA4 Event Tracking
Tracked events:
- `page_view`, `scroll_depth` (25/50/75/100%)
- `section_view` (Intersection Observer)
- `link_paste_submit`, `teaser_view`, `unlock_full_click`
- `waitlist_submit`, `founding_drop_click`, `signup_success`
- `pricing_click`, `faq_interaction`, `navigation_click`
- Plus 10+ more events for comprehensive tracking

### 8. FOMO & Urgency Elements
- **Countdown**: "CLOSING SOON: 07d:12h:34m:56s"
- **Scarcity**: "ALMOST GONE: Only 77/100 left!"
- **Social Proof**: "Join 10K+ creators"
- **Waitlist Rank**: "You're #10,234 in line"

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon Database account (for production) - https://console.neon.tech

### Environment Variables

Create `.env.local`:
```bash
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-quiet-cake-aeqe9mc1-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
```

> **Note**: Replace `YOUR_PASSWORD` with your actual Neon database password.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Initialize database tables:
```bash
node scripts/setup-analytics.mjs
```

Expected output:
```
✅ Connected to database successfully!
✅ Table 'analytics_events' ready
✅ Table 'page_views' ready
✅ Table 'conversion_funnel' ready
✅ Created index 'idx_events_created_at'
... (7 indexes total)
🎉 Analytics database setup complete!
```

3. Run development server:
```bash
npm run dev
```

4. Open the app:
- Landing page: http://localhost:3000
- Analytics dashboard: http://localhost:3000/admin

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

### Analytics Tables (NEW!)

**Table: `analytics_events`**
```sql
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  page_path VARCHAR(500),
  session_id VARCHAR(255),
  user_id VARCHAR(255),
  device_type VARCHAR(50),
  browser VARCHAR(100),
  traffic_source VARCHAR(100),
  referrer TEXT,
  user_agent TEXT,
  ip_address VARCHAR(45),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_events_category ON analytics_events(category);
CREATE INDEX idx_events_session ON analytics_events(session_id);
CREATE INDEX idx_events_user ON analytics_events(user_id);
```

**Table: `page_views`**
```sql
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL,
  session_id VARCHAR(255),
  user_id VARCHAR(255),
  device_type VARCHAR(50),
  browser VARCHAR(100),
  traffic_source VARCHAR(100),
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pageviews_created_at ON page_views(created_at);
CREATE INDEX idx_pageviews_path ON page_views(page_path);
```

**Table: `conversion_funnel`**
```sql
CREATE TABLE IF NOT EXISTS conversion_funnel (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  step_name VARCHAR(100) NOT NULL,
  step_order INTEGER NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_funnel_session ON conversion_funnel(session_id);
```

### Waitlist Table

Required table for waitlist signups:
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

#### Method 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel
```

3. Add environment variables in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string
   - Redeploy

#### Method 2: Vercel Dashboard

1. Push to GitHub
2. Import project in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy

### Post-Deployment

After deployment:
1. Add `DATABASE_URL` to Vercel environment variables
2. Run `node scripts/setup-analytics.mjs` with production DATABASE_URL (if tables don't exist)
3. Visit `https://your-app.vercel.app/admin` to verify analytics dashboard
4. Test waitlist signup flow
5. Check GA4 Real-Time report

### Environment Variables in Vercel
- `DATABASE_URL`: Neon PostgreSQL connection string

## Analytics Setup

### Accessing the Analytics Dashboard

Navigate to `/admin` after starting your dev server:
```
http://localhost:3000/admin
```

In production:
```
https://your-app.vercel.app/admin
```

### Dashboard Features

#### Summary Cards
- **Total Page Views**: All page visits across the site
- **Total Sessions**: Unique user sessions (tracked via sessionStorage)
- **Total Conversions**: Waitlist signups + founding drop clicks
- **Click-Through Rate (CTR)**: `(Total CTA Clicks / Total Page Views) × 100`
- **Conversion Rate (CVR)**: `(Total Conversions / Total Sessions) × 100`
- **Bounce Rate**: `(Single Page Sessions / Total Sessions) × 100`

#### Chart Visualizations
- **Page Views Over Time**: Line chart (last 7 days)
- **CTA Performance**: Bar chart comparing different CTAs
- **Traffic Sources**: Pie chart (direct/social/search/referral)
- **Device Breakdown**: Pie chart (desktop/mobile/tablet)

#### Data Tables
- **Top Pages**: Sorted by view count
- **Top CTAs**: Sorted by click count

#### Conversion Funnel
Shows step-by-step progression:
1. Page View → Analyze Click
2. Analyze Click → Waitlist Submit
3. Waitlist Submit → Founding Drop Click

### Tracked Events

The app automatically tracks 19+ events:

| Event | Category | When Triggered |
|-------|----------|----------------|
| `page_view` | pageview | Every page load |
| `scroll_depth_25/50/75/100` | engagement | User scrolls percentage of page |
| `section_view` | engagement | User views a section |
| `link_paste_submit` | conversion | User submits video link |
| `teaser_view` | engagement | User views analysis results |
| `unlock_full_click` | conversion | User clicks "Unlock Full Recipe" |
| `waitlist_submit` | conversion | User submits waitlist form |
| `founding_drop_click` | conversion | User clicks Founding Drop CTA |
| `cta_click` | cta | Any CTA button clicked |
| `pricing_click` | cta | Pricing plan selected |
| `faq_interaction` | engagement | FAQ accordion toggled |
| `navigation_click` | navigation | Header/footer link clicked |

### Custom Event Tracking

To track custom events in your components:

```typescript
import { analytics } from '@/lib/analytics'

// Track CTA click
analytics.trackCTAClick('button_name', 'section_name')

// Track page view
analytics.trackPageView('/custom-page')

// Track conversion funnel step
analytics.trackFunnelStep('custom_step', 4, { key: 'value' })
```

### GA4 Integration

GA4 is pre-configured with ID: `G-FX115HN1EW`

To use your own:
1. Edit `app/layout.tsx`
2. Replace measurement ID
3. Redeploy

## Recent Changes (2026-01-08)

### ✅ Analytics Dashboard Implementation
- Created `/admin` page with real-time metrics and Chart.js visualizations
- Implemented CTR/CVR calculations with formulas visible in dashboard
- Added conversion funnel tracking (page view → analyze → waitlist → founding drop)
- Built device/browser/traffic source analytics
- Added auto-refresh (updates every 30 seconds)

### ✅ Database Setup
- Created 3 analytics tables: `analytics_events`, `page_views`, `conversion_funnel`
- Added 7 indexes for query performance optimization
- Built `setup-analytics.mjs` script for easy database initialization
- Integrated Neon PostgreSQL serverless database

### ✅ Event Tracking System
- Built `lib/analytics.ts` with automatic session/user ID management
- Implemented 19+ tracked events (page views, CTA clicks, scroll depth, form submits)
- Added client-side tracking with localStorage/sessionStorage
- Integrated with GA4 for dual tracking (custom + GA4)

### ✅ Hero Section Enhancement
- Added blur effect (`blur-md` filter) on analysis results
- Implemented unlock overlay to drive conversions
- Updated copy: "🔓 Join 500 waitlisters to unlock full recipe"
- Maintained analysis functionality while gating full results

### ✅ Pricing & Contact Updates
- **Founding Drop**: Changed from $20 to **FREE**
  - Price display: Gradient "FREE" with strikethrough ~~$20~~
  - Button: "Get FREE Early Access"
  - Copy: "FREE for first 100" (was "$20 for first 100")
- **Recipe Count**: Changed "3 custom recipes" to "Custom recipe" (singular)
- **Email**: Updated to `parrotkit.contact@gmail.com` (from `hello@parrotkit.com`)

### ✅ Documentation
- Created comprehensive setup guide with troubleshooting
- Added database schema documentation
- Documented all API endpoints and event tracking
- Added deployment instructions for Vercel

---

## Troubleshooting

### Common Issues

#### Database Connection Error
**Error**: `connection failed` or `authentication failed`

**Solution**:
1. Check `.env.local` has correct `DATABASE_URL`
2. Verify Neon database is active (not paused)
3. Run: `node scripts/setup-analytics.mjs`

#### Admin Dashboard Shows "Database not configured"
**Cause**: `DATABASE_URL` not set or tables don't exist

**Solution**:
1. Add `DATABASE_URL` to `.env.local`
2. Run: `node scripts/setup-analytics.mjs`
3. Restart dev server: `npm run dev`

#### Analytics Events Not Tracking
**Solution**:
1. Check browser console for errors
2. Verify sessionStorage/localStorage permissions
3. Clear browser cache and reload

#### Build Error: "Dynamic server usage"
This is expected for API routes. It's a warning, not an error. Build will succeed.

#### Port Already in Use
Next.js will auto-assign next available port (3001, 3002, etc.)

Or manually specify:
```bash
PORT=3002 npm run dev
```

---

## Performance Optimizations

- ✅ Next.js 14 App Router for optimal loading
- ✅ Tailwind CSS for minimal bundle size
- ✅ Image optimization ready
- ✅ Server Components where possible
- ✅ Client Components only for interactivity
- ✅ Database indexes for fast analytics queries
- ✅ Chart.js with optimized rendering

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## FAQ

### Q: How do I change the Founding Drop price?
A: Edit `lib/landingConfig.ts`:
```typescript
foundingDropOneTimePrice: 0  // 0 for FREE, or set dollar amount
```

### Q: How do I add more videos to the carousel?
A: Edit `components/Hero.tsx`:
```typescript
const exampleShorts = [
  'VIDEO_ID_1',
  'VIDEO_ID_2',
  'VIDEO_ID_3',
  'VIDEO_ID_4',  // Add more here
]
```

### Q: How do I export analytics data?
A: Connect to your Neon database with any PostgreSQL client:
```sql
COPY (SELECT * FROM analytics_events) TO '/path/to/export.csv' CSV HEADER;
```

### Q: Can I use a different database?
A: Yes, update `lib/db.ts` with your database client and modify API routes accordingly.

## Contributing

This is a production landing page. For bug reports or feature requests, please open an issue.

## License

MIT

## Support

For questions: **parrotkit.contact@gmail.com**

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Chart.js**

