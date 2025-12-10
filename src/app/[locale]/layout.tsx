import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
const locales = ['en', 'ru', 'uz'] as const;
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neco.uz';
  
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
      url: `${siteUrl}/${locale}`,
      siteName: 'Neco',
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
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        ru: `${siteUrl}/ru`,
        uz: `${siteUrl}/uz`,
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
    name: 'Neco',
    description: 'Professional website development with lifetime hosting and support',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://neco.uz',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neco.uz'}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998-90-000-00-00',
      contactType: 'customer service',
      availableLanguage: ['English', 'Russian', 'Uzbek'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UZ',
      addressLocality: 'Tashkent',
    },
    sameAs: ['https://t.me/necoagency'],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '99',
      highPrice: '499',
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

