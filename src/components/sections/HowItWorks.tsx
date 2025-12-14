'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageSquare, Palette, Code, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  { icon: MessageSquare, key: 0 },
  { icon: Palette, key: 1 },
  { icon: Code, key: 2 },
  { icon: CheckCircle, key: 3 },
  { icon: Rocket, key: 4 },
];

export function HowItWorks() {
  const t = useTranslations('about');
  const process = t.raw('process') as Array<{ title: string; description: string; day: string }>;

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">How It </span>
            <span className="bg-gradient-to-r from-emerald-500 via-gray-800 to-green-500 dark:from-emerald-300 dark:via-white/90 dark:to-green-300 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          {process.map((step, index) => {
            const Icon = steps[index].icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative mb-16 last:mb-0"
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#161B22] border border-gray-200 dark:border-[#30363D] flex items-center justify-center">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-center`}>
                    <div className="text-sm text-primary font-semibold mb-2">{step.day}</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-24 w-0.5 h-16 bg-gradient-to-b from-primary/50 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

