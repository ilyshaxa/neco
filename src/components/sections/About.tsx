'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Server, Cloud, Palette, TrendingUp, Users, Briefcase, Award, ThumbsUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

const expertiseIcons = {
  backend: Server,
  devops: Cloud,
  frontend: Palette,
  seo: TrendingUp,
};

export function About() {
  const t = useTranslations('about');
  const expertise = ['backend', 'devops', 'frontend', 'seo'];
  const process = t.raw('process') as Array<{ title: string; description: string; day: string }>;

  const stats = [
    { icon: Award, key: 'years', labelKey: 'years_label' },
    { icon: Briefcase, key: 'projects', labelKey: 'projects_label' },
    { icon: Users, key: 'clients', labelKey: 'clients_label' },
    { icon: ThumbsUp, key: 'satisfaction', labelKey: 'satisfaction_label' },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
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
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.key} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {t(`stats.${stat.key}`)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t(`stats.${stat.labelKey}`)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Expertise */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            {t('expertise_title')}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => {
              const Icon = expertiseIcons[item as keyof typeof expertiseIcons];
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="text-center h-full hover:scale-105 transition-transform">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{t(`expertise.${item}.title`)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t(`expertise.${item}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Timeline */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            {t('process_title')}
          </motion.h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary hidden md:block" />

              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative mb-12 md:mb-16 ${
                    index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'
                  }`}
                >
                  <div className={`md:flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <Card className={`md:w-5/12 relative ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-primary font-bold text-lg">{step.day}</span>
                          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

