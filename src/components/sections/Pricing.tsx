'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const plans = [
  { key: 'basic', popular: false },
  { key: 'standard', popular: true },
  { key: 'premium', popular: false },
];

export function Pricing() {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const features = t.raw(`${plan.key}.features`) as string[];
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      {t('popular')}
                    </div>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.popular
                      ? 'border-2 border-primary shadow-2xl scale-105'
                      : ''
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{t(`${plan.key}.name`)}</CardTitle>
                    <CardDescription>{t(`${plan.key}.description`)}</CardDescription>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-primary">
                        {t(`${plan.key}.price`)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.popular ? 'primary' : 'secondary'}
                      className="w-full"
                      size="lg"
                      onClick={() =>
                        document.querySelector('#contact')?.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                    >
                      {t('cta')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

