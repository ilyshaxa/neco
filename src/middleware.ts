import createMiddleware from 'next-intl/middleware';

export const locales = ['en', 'ru', 'uz'] as const;

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(en|ru|uz)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};

