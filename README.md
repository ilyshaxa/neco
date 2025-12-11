# Neco - IT Agency Website

Modern, multilingual website for Neco IT agency specializing in affordable website development for local businesses in Uzbekistan.

## Features

- 🌐 Multilingual support (English, Russian, Uzbek)
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive design
- ⚡ Fast and optimized with Next.js 16
- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 💰 Interactive pricing calculator with real-time updates
- 🎁 Automatic bonus tier system
- 📧 Contact form with Telegram integration
- 🔍 SEO optimized

## Getting Started

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

> **Note:** The `--legacy-peer-deps` flag is required because we're using Next.js 16 and React 19, which some dependencies don't officially support yet (but they work fine).

2. Copy `.env.local.example` to `.env.local` and add your Telegram bot credentials:
```bash
cp .env.local.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Theme**: next-themes
- **Icons**: Lucide React

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

Don't forget to add your environment variables in the Vercel dashboard.

## License

MIT

