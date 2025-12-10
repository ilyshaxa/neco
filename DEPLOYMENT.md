# Deployment Checklist

Use this checklist before deploying your Neco website to production.

## Pre-Deployment Checklist

### Configuration
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Configure Telegram bot token and chat ID
- [ ] Test contact form in development
- [ ] Update contact information (phone, email, Telegram handle)
- [ ] Update company information in Footer

### Content
- [ ] Replace placeholder portfolio projects with real ones
- [ ] Update client testimonials with real reviews
- [ ] Verify all pricing information is accurate
- [ ] Check service descriptions match your offerings
- [ ] Update About section statistics (years, projects, etc.)
- [ ] Review all translations (EN/RU/UZ) for accuracy

### SEO & Marketing
- [ ] Add Google Analytics tracking code (optional)
- [ ] Set up Google Search Console
- [ ] Submit sitemap to search engines
- [ ] Add Open Graph images for social sharing
- [ ] Verify meta descriptions in all languages
- [ ] Test social media previews

### Performance
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Optimize images in portfolio section
- [ ] Test loading speed on 3G connection
- [ ] Check mobile performance
- [ ] Verify Core Web Vitals

### Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari and Chrome Mobile
- [ ] Test dark/light theme toggle
- [ ] Test language switching (EN/RU/UZ)
- [ ] Test all navigation links
- [ ] Test contact form submission
- [ ] Verify Telegram notifications work
- [ ] Test all CTAs (buttons, links)
- [ ] Check responsive design on multiple devices

### Security
- [ ] Add rate limiting to contact form
- [ ] Verify environment variables are not exposed
- [ ] Enable HTTPS/SSL
- [ ] Set proper CORS headers
- [ ] Review Next.js security headers

### Accessibility
- [ ] Run accessibility audit
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Test with screen reader
- [ ] Check ARIA labels

## Deployment Options

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero configuration
- Automatic deployments on git push
- Global CDN
- Free SSL
- Environment variable management
- Preview deployments

**Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Environment Variables to Set:**
```
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Option 2: Netlify

**Steps:**
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables
6. Deploy!

### Option 3: Your Own Server (VPS)

**Requirements:**
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

**Steps:**

1. **Prepare Server:**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

2. **Upload Code:**
```bash
# Clone or upload your code
git clone your-repo.git
cd neco

# Install dependencies
npm install

# Build
npm run build
```

3. **Set Environment Variables:**
```bash
# Create .env.local file
nano .env.local

# Add your variables:
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

4. **Start with PM2:**
```bash
pm2 start npm --name "neco" -- start
pm2 save
pm2 startup
```

5. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. **Set Up SSL:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Option 4: Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  neco:
    build: .
    ports:
      - "3000:3000"
    environment:
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
      - NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
    restart: unless-stopped
```

## Post-Deployment

### Immediate Tasks
- [ ] Test live site on multiple devices
- [ ] Send test message through contact form
- [ ] Verify all links work
- [ ] Check analytics is tracking
- [ ] Test language switching
- [ ] Verify SEO meta tags

### Week 1 Tasks
- [ ] Monitor error logs
- [ ] Check contact form submissions
- [ ] Monitor performance metrics
- [ ] Review user feedback
- [ ] Check search engine indexing

### Ongoing Maintenance
- [ ] Update dependencies monthly
- [ ] Review and respond to contact form submissions
- [ ] Update portfolio with new projects
- [ ] Refresh testimonials
- [ ] Monitor and improve SEO
- [ ] Back up data regularly

## Monitoring

### Recommended Tools
- **Analytics**: Google Analytics, Plausible
- **Performance**: Vercel Analytics, Lighthouse CI
- **Errors**: Sentry, LogRocket
- **Uptime**: UptimeRobot, Pingdom
- **SEO**: Google Search Console, Ahrefs

### Key Metrics to Track
- Page load time
- Core Web Vitals (LCP, FID, CLS)
- Conversion rate (contact form submissions)
- Traffic sources
- Popular pages
- Bounce rate
- Mobile vs desktop traffic

## Rollback Plan

If something goes wrong:

**Vercel:**
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Promote to Production"

**Your Server:**
```bash
# Stop current process
pm2 stop neco

# Restore from backup or previous git commit
git checkout previous-working-commit

# Rebuild and restart
npm run build
pm2 restart neco
```

## Support

If you encounter issues:
1. Check server logs: `pm2 logs neco` (if using PM2)
2. Verify environment variables are set
3. Check Vercel deployment logs
4. Test locally first
5. Contact support if needed

## Success Criteria

Your deployment is successful when:
- ✅ Site loads in under 3 seconds
- ✅ All sections display correctly
- ✅ Contact form sends messages to Telegram
- ✅ Theme toggle works
- ✅ Language switching works
- ✅ Mobile experience is smooth
- ✅ SEO tags are present
- ✅ Analytics is tracking
- ✅ No console errors

## Next Steps

After successful deployment:
1. Share site with team for feedback
2. Start marketing efforts
3. Monitor performance and user behavior
4. Iterate based on feedback
5. Add new features as needed

Good luck with your deployment! 🚀

