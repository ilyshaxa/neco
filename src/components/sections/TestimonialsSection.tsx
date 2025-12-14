'use client';

import { useTranslations } from 'next-intl';
import { Testimonials } from '@/components/ui/unique-testimonial';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Array<{ name: string; company: string; text: string; rating: number }>;

  // Professional Unsplash avatars
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
  ];

  const testimonials = items.map((item, index) => ({
    id: index + 1,
    quote: item.text,
    author: item.name,
    role: item.company,
    avatar: avatars[index] || avatars[0],
  }));

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">What Our </span>
            <span className="bg-gradient-to-r from-emerald-500 via-gray-800 to-green-500 dark:from-emerald-300 dark:via-white/90 dark:to-green-300 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Testimonials testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  );
}

