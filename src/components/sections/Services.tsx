'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, Search, MapPin, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

const services = [
  {
    icon: Code,
    key: 'web_dev',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Search,
    key: 'seo',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: MapPin,
    key: 'business_listings',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Globe,
    key: 'domain',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:scale-105 transition-transform duration-300 group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{t(`${service.key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t(`${service.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

