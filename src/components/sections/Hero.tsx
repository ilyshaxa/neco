'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');

  const badges = [
    t('trust_badge_1'),
    t('trust_badge_2'),
    t('trust_badge_3'),
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),transparent)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full shadow-md border border-gray-100 dark:border-gray-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{badge}</span>
                </motion.div>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('subheadline')}
            </p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                variant="primary"
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
                className="w-full sm:w-auto group"
              >
                <span className="flex items-center gap-2">
                  {t('cta_primary')}
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() =>
                  document.querySelector('#pricing')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
                className="w-full sm:w-auto"
              >
                {t('cta_secondary')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 to-transparent h-32 bottom-0 z-10" />
            <div className="grid grid-cols-3 gap-4 opacity-50">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

