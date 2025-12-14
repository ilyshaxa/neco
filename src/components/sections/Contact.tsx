'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, Phone, Clock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useState, FormEvent } from 'react';
import { contactConfig } from '@/lib/config';

export function Contact() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-gray-900 dark:text-white">{t('titlePart1')} </span>
                <span className="bg-gradient-to-r from-emerald-500 via-gray-800 to-green-500 dark:from-emerald-300 dark:via-white/90 dark:to-green-300 bg-clip-text text-transparent">
                  {t('titlePart2')}
                </span>
              </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white dark:bg-[#161B22] border-gray-200 dark:border-[#30363D]">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      {t('form.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t('form.name_placeholder')}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      {t('form.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t('form.email_placeholder')}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      {t('form.phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={t('form.phone_placeholder')}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      {t('form.message')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder={t('form.message_placeholder')}
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t('form.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {t('form.submit')}
                      </span>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 dark:bg-[#1C2128] border border-green-200 dark:border-primary rounded-xl text-green-800 dark:text-primary">
                      {t('form.success')}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 dark:bg-[#1C2128] border border-red-200 dark:border-red-500/50 rounded-xl text-red-800 dark:text-red-400">
                      {t('form.error')}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-[#161B22] border-gray-200 dark:border-[#30363D]">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('info.title')}
                </h3>

                <div className="space-y-4">
                  <a
                    href={contactConfig.telegram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#1C2128] hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors group border border-transparent dark:border-[#30363D]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Send className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t('info.telegram')}
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        @{contactConfig.telegram.handle}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`tel:${contactConfig.phoneFormatted}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#1C2128] hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors group border border-transparent dark:border-[#30363D]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t('info.phone')}
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {contactConfig.phone}
                      </div>
                    </div>
                  </a>
                </div>

                <div className="mt-6 p-4 bg-primary/10 dark:bg-primary/20 rounded-xl border border-transparent dark:border-[#30363D]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {t('info.response_time')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

