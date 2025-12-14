import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
const locales = ['en', 'ru', 'uz'] as const;
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { HeaderModern } from '@/components/layout/HeaderModern';
import { FooterModernWrapper } from '@/components/layout/FooterModernWrapper';
import { siteConfig, companyConfig, contactConfig } from '@/lib/config';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const titles = {
    en: 'Neco - Affordable Websites for Local Businesses',
    ru: 'Neco - Доступные сайты для местного бизнеса',
    uz: "Neco - Mahalliy bizneslar uchun arzon veb-saytlar",
  };

  const descriptions = {
    en: 'Professional website development with lifetime hosting and support for businesses in Uzbekistan. Fast, modern, SEO-optimized websites starting from $99.',
    ru: 'Профессиональная разработка сайтов с пожизненным хостингом и поддержкой для бизнеса в Узбекистане. Быстрые, современные, SEO-оптимизированные сайты от $99.',
    uz: "O'zbekistondagi biznes uchun umrbod hosting va qo'llab-quvvatlash bilan professional veb-sayt ishlab chiqish. $99 dan boshlanadigan tez, zamonaviy, SEO-optimallashtirilgan veb-saytlar.",
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    title,
    description,
    keywords: 'website development, web design, SEO, Uzbekistan, Tashkent, affordable websites, veb sayt yaratish, создание сайтов',
    authors: [{ name: 'Neco' }],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        ru: `${siteConfig.url}/ru`,
        uz: `${siteConfig.url}/uz`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages dynamically
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: 'Professional website development with lifetime hosting and support',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactConfig.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Russian', 'Uzbek'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: companyConfig.address.country,
      addressLocality: companyConfig.address.city,
    },
    sameAs: [contactConfig.telegram.url],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '49',
      highPrice: '399',
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem
          disableTransitionOnChange
          storageKey="neco-theme"
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <HeaderModern />
            <main>{children}</main>
            <FooterModernWrapper />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

