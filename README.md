# ShortsRecipe Landing Page

A modern, responsive landing page built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful gradient design inspired by modern SaaS products
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Next.js 14
- 🎯 Conversion-focused layout
- 🎭 Smooth animations and transitions
- 📝 Easy to customize

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Method 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

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
shorts-recipe-landing/
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
