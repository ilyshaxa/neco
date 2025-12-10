# Neco Website Setup Guide

Welcome! This guide will help you get your Neco agency website up and running.

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- A Telegram account (for contact form)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Telegram bot credentials:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
NEXT_PUBLIC_SITE_URL=https://neco.uz
```

#### Getting Telegram Credentials:

**Step 1: Create a Telegram Bot**
1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
5. Paste it as `TELEGRAM_BOT_TOKEN` in your `.env.local`

**Step 2: Get Your Chat ID**
1. Start a chat with your new bot
2. Send any message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   (Replace `<YOUR_BOT_TOKEN>` with your actual token)
4. Look for `"chat":{"id":123456789}` in the response
5. Copy the chat ID and paste it as `TELEGRAM_CHAT_ID` in your `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website!

The site will automatically redirect to `/en` (English). You can also visit:
- `/ru` for Russian
- `/uz` for Uzbek

## Customization Guide

### Update Contact Information

Edit the following files to update your contact details:

1. **Footer Component** (`src/components/layout/Footer.tsx`):
   - Update Telegram handle: `@necoagency`
   - Update phone number: `+998 90 000 00 00`

2. **Contact Section** (`src/components/sections/Contact.tsx`):
   - Update contact information display

### Modify Pricing

Edit `src/messages/en.json`, `ru.json`, and `uz.json`:

```json
"pricing": {
  "basic": {
    "price": "$99",
    "features": [...]
  }
}
```

### Add Real Portfolio Projects

Replace placeholder projects in `src/messages/en.json`:

```json
"portfolio": {
  "projects": [
    {
      "name": "Your Client Name",
      "category": "Industry"
    }
  ]
}
```

For real images, add them to `public/portfolio/` directory and update `Portfolio.tsx`.

### Update Team Information

Edit the About section in translation files:

```json
"about": {
  "stats": {
    "years": "5+ Years",
    "projects": "100+ Projects",
    ...
  }
}
```

### Change Color Scheme

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#1e3a8a',  // Your primary color
    light: '#2563eb',
    dark: '#1e40af',
  },
}
```

## Building for Production

```bash
npm run build
```

Test the production build locally:

```bash
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_SITE_URL`
5. Deploy!

### Deploy to Your Own Server

1. Build the project: `npm run build`
2. Upload the `.next`, `public`, and `node_modules` folders
3. Set up environment variables on your server
4. Run: `npm start`
5. Use a process manager like PM2 to keep it running

Example with PM2:
```bash
pm2 start npm --name "neco" -- start
pm2 save
pm2 startup
```

## Testing

### Test Different Languages

- English: http://localhost:3000/en
- Russian: http://localhost:3000/ru
- Uzbek: http://localhost:3000/uz

### Test Dark/Light Theme

Click the sun/moon icon in the header to toggle themes.

### Test Contact Form

1. Fill out the contact form
2. Check your Telegram bot for the message
3. If not configured, the form will still work (returns success without sending)

## SEO Checklist

- [ ] Update site URL in `.env.local`
- [ ] Customize meta descriptions in each language
- [ ] Add real client testimonials
- [ ] Add actual portfolio images
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (add tracking ID)

## Troubleshooting

### Issue: Port 3000 already in use

Run on a different port:
```bash
PORT=3001 npm run dev
```

### Issue: Telegram messages not sending

1. Check your bot token is correct
2. Make sure you've sent at least one message to the bot
3. Verify your chat ID is a number (no quotes needed)
4. Check server logs for error messages

### Issue: Translations not showing

1. Make sure you're using the correct locale in the URL (`/en`, `/ru`, `/uz`)
2. Clear browser cache
3. Restart the development server

## Support

For questions or issues:
- Email: support@neco.uz
- Telegram: @necoagency

## License

MIT License - feel free to customize for your business!

