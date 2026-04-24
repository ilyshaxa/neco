# ==============================================
# Stage 1: Dependencies
# ==============================================
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && \
    cp -R node_modules /prod_modules && \
    npm ci

# ==============================================
# Stage 2: Build
# ==============================================
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (NEXT_PUBLIC_* are inlined into client JS during build)
# Pass these via: docker build --build-arg NEXT_PUBLIC_SITE_URL=https://neco.uz ...
ARG NEXT_PUBLIC_SITE_URL=https://neco.uz
ARG NEXT_PUBLIC_SITE_NAME=Neco
ARG NEXT_PUBLIC_CONTACT_EMAIL=info@neco.uz
ARG NEXT_PUBLIC_CONTACT_PHONE=+998900000000
ARG NEXT_PUBLIC_CONTACT_TELEGRAM_HANDLE=necouz
ARG NEXT_PUBLIC_CONTACT_TELEGRAM_URL=https://t.me/necouz
ARG NEXT_PUBLIC_COMPANY_ADDRESS_COUNTRY=UZ
ARG NEXT_PUBLIC_COMPANY_ADDRESS_CITY=Tashkent
ARG NEXT_PUBLIC_PRICE_LANDING=49
ARG NEXT_PUBLIC_PRICE_MULTIPAGE=99
ARG NEXT_PUBLIC_PRICE_CUSTOM=249
ARG NEXT_PUBLIC_PRICE_ECOMMERCE=399
ARG NEXT_PUBLIC_PRICE_EMAIL=15
ARG NEXT_PUBLIC_PRICE_FORMS=20
ARG NEXT_PUBLIC_PRICE_ANALYTICS=10
ARG NEXT_PUBLIC_PRICE_CHAT=25
ARG NEXT_PUBLIC_PRICE_BOOKING=30
ARG NEXT_PUBLIC_PRICE_BLOG=35
ARG NEXT_PUBLIC_PRICE_PAYMENT=40
ARG NEXT_PUBLIC_PRICE_SEO_BASIC=50
ARG NEXT_PUBLIC_PRICE_SEO_STANDARD=100
ARG NEXT_PUBLIC_PRICE_SEO_PREMIUM=200
ARG NEXT_PUBLIC_SOCIAL_TELEGRAM=https://t.me/necoagency
ARG NEXT_PUBLIC_SOCIAL_FACEBOOK=
ARG NEXT_PUBLIC_SOCIAL_INSTAGRAM=
ARG NEXT_PUBLIC_SOCIAL_LINKEDIN=
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Remove env file from standalone output
RUN rm -f .next/standalone/.env

# ==============================================
# Stage 3: Production
# ==============================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
