import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

const locales = ['en', 'ru', 'uz'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const routes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  return routes;
}

