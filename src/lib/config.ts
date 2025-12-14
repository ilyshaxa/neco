/**
 * Centralized Configuration
 * 
 * This file provides type-safe access to all environment variables.
 * All configuration should be imported from this file to ensure consistency.
 * 
 * @see .env.example for all available environment variables
 */

/**
 * Site Configuration
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://neco.uz',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Neco',
} as const;

/**
 * Contact Information
 */
export const contactConfig = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@neco.uz',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+998900000000',
  phoneFormatted: process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace(/\s/g, '') || '+998900000000',
  telegram: {
    handle: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_HANDLE || 'necoagency',
    url: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_URL || 'https://t.me/necoagency',
  },
} as const;

/**
 * Company Information
 */
export const companyConfig = {
  address: {
    country: process.env.NEXT_PUBLIC_COMPANY_ADDRESS_COUNTRY || 'UZ',
    city: process.env.NEXT_PUBLIC_COMPANY_ADDRESS_CITY || 'Tashkent',
  },
} as const;

/**
 * Telegram Bot Configuration (Server-side only)
 * These are private and should NEVER be exposed to the client
 */
export const telegramBotConfig = {
  token: process.env.TELEGRAM_BOT_TOKEN || '',
  chatId: process.env.TELEGRAM_CHAT_ID || '',
} as const;

/**
 * Pricing Configuration (USD)
 */
export const pricingConfig = {
  websites: {
    landing: Number(process.env.NEXT_PUBLIC_PRICE_LANDING) || 49,
    multipage: Number(process.env.NEXT_PUBLIC_PRICE_MULTIPAGE) || 99,
    custom: Number(process.env.NEXT_PUBLIC_PRICE_CUSTOM) || 249,
    ecommerce: Number(process.env.NEXT_PUBLIC_PRICE_ECOMMERCE) || 399,
  },
  addons: {
    email: Number(process.env.NEXT_PUBLIC_PRICE_EMAIL) || 15,
    forms: Number(process.env.NEXT_PUBLIC_PRICE_FORMS) || 20,
    analytics: Number(process.env.NEXT_PUBLIC_PRICE_ANALYTICS) || 10,
    chat: Number(process.env.NEXT_PUBLIC_PRICE_CHAT) || 25,
    booking: Number(process.env.NEXT_PUBLIC_PRICE_BOOKING) || 30,
    blog: Number(process.env.NEXT_PUBLIC_PRICE_BLOG) || 35,
    payment: Number(process.env.NEXT_PUBLIC_PRICE_PAYMENT) || 40,
  },
  seo: {
    basic: Number(process.env.NEXT_PUBLIC_PRICE_SEO_BASIC) || 50,
    standard: Number(process.env.NEXT_PUBLIC_PRICE_SEO_STANDARD) || 100,
    premium: Number(process.env.NEXT_PUBLIC_PRICE_SEO_PREMIUM) || 200,
  },
} as const;

/**
 * Social Media Links
 */
export const socialConfig = {
  telegram: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM || 'https://t.me/necoagency',
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '',
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || '',
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '',
} as const;

/**
 * SEO Configuration
 */
export const seoConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
} as const;

/**
 * Helper function to check if required environment variables are set
 */
export function checkRequiredEnvVars() {
  const required = {
    'TELEGRAM_BOT_TOKEN': telegramBotConfig.token,
    'TELEGRAM_CHAT_ID': telegramBotConfig.chatId,
  };

  const missing: string[] = [];
  
  for (const [key, value] of Object.entries(required)) {
    if (!value || value === 'your_telegram_bot_token_here' || value === 'your_telegram_chat_id_here') {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.warn('⚠️  Missing required environment variables:', missing.join(', '));
    console.warn('⚠️  Contact form will not work until these are configured.');
    console.warn('⚠️  See .env.example for instructions.');
  }

  return missing.length === 0;
}

/**
 * Type-safe config export
 */
export const config = {
  site: siteConfig,
  contact: contactConfig,
  company: companyConfig,
  telegram: telegramBotConfig,
  pricing: pricingConfig,
  social: socialConfig,
  seo: seoConfig,
} as const;

// Export type for use in other files
export type Config = typeof config;

