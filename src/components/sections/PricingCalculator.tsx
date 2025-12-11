'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, Package, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface PricingConfig {
  websiteType: string;
  addons: string[];
  seoPackage: string;
  domainAssistance: boolean;
}

const websiteTypes = {
  landing: { name: 'Landing Page', price: 49 },
  multipage: { name: 'Multi-Page Website', price: 99 },
  custom: { name: 'Custom Design', price: 249 },
  ecommerce: { name: 'E-commerce', price: 399 },
};

// Sort addons by price (free first, then low to high)
const addonsUnsorted = {
  hosting: { 
    name: 'Lifetime Hosting', 
    price: 0,
    description: 'Your website will be hosted on our reliable servers forever, with 99.9% uptime guarantee.'
  },
  support: { 
    name: 'Lifetime Technical Support', 
    price: 0,
    description: 'Get unlimited technical support for as long as your website is hosted with us.'
  },
  contact: { 
    name: 'Contact Form', 
    price: 0,
    description: 'A professional contact form to collect messages from your visitors.'
  },
  ssl: { 
    name: 'Free SSL Certificate', 
    price: 0,
    description: 'Secure your website with HTTPS encryption for visitor trust and better SEO.'
  },
  mobile: { 
    name: 'Mobile Optimization', 
    price: 0,
    description: 'Your website will look perfect on all mobile devices and tablets.'
  },
  social: { 
    name: 'Social Media Integration', 
    price: 0,
    description: 'Connect your social media accounts and add share buttons to your website.'
  },
  performance: { 
    name: 'Performance Optimization', 
    price: 0,
    description: 'Fast loading speeds with optimized code and images for better user experience.'
  },
  animations: { 
    name: 'Custom Animations', 
    price: 0,
    description: 'Smooth, professional animations to make your website more engaging.'
  },
  speed: { 
    name: 'Speed Optimization', 
    price: 0,
    description: 'Advanced speed optimization techniques for lightning-fast page loads.'
  },
  email: { 
    name: 'Business Email', 
    price: 15,
    description: 'Professional email addresses using your domain (e.g., info@yourbusiness.com).'
  },
  booking: { 
    name: 'Booking System', 
    price: 20,
    description: 'Allow clients to book appointments or services directly on your website.'
  },
  gallery: { 
    name: 'Photo Gallery', 
    price: 20,
    description: 'Beautiful image galleries to showcase your work or products.'
  },
  multilang: { 
    name: 'Multi-Language Support', 
    price: 20,
    description: 'Reach more customers with website translation in multiple languages.'
  },
  analytics: { 
    name: 'Analytics Setup', 
    price: 20,
    description: 'Track visitors and understand your audience with Google Analytics integration.'
  },
  blog: { 
    name: 'Blog Functionality', 
    price: 40,
    description: 'Share news, articles, and updates with a fully-featured blog system.'
  },
  ai: { 
    name: 'AI ChatBot', 
    price: 40,
    description: 'Automated customer support chatbot to answer common questions 24/7.'
  },
  logo: { 
    name: 'Logo Design', 
    price: 50,
    description: 'Custom logo design to establish your brand identity.'
  },
};

// Sort by price
const addons = Object.fromEntries(
  Object.entries(addonsUnsorted).sort((a, b) => a[1].price - b[1].price)
) as typeof addonsUnsorted;

const seoPackages = {
  none: { 
    name: 'No SEO', 
    price: 0,
    description: 'No SEO optimization included.'
  },
  basic: { 
    name: 'Basic SEO', 
    price: 20,
    description: 'Essential SEO optimization including meta tags, sitemap, and robots.txt.'
  },
  advanced: { 
    name: 'Advanced SEO', 
    price: 40,
    description: 'Comprehensive SEO with keyword research, content optimization, and local SEO setup.'
  },
  premium: { 
    name: 'Premium SEO', 
    price: 60,
    description: 'Complete SEO solution with ongoing optimization, backlink building, and monthly reports.'
  },
};

export function PricingCalculator() {
  const t = useTranslations('pricingCalculator');
  
  const [config, setConfig] = useState<PricingConfig>({
    websiteType: 'landing',
    addons: ['hosting', 'support', 'contact', 'ssl', 'mobile', 'social', 'performance', 'animations', 'speed'],
    seoPackage: 'none',
    domainAssistance: false,
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [expandedAddons, setExpandedAddons] = useState<string[]>([]);

  useEffect(() => {
    calculateTotal();
  }, [config]);

  const calculateTotal = () => {
    let total = websiteTypes[config.websiteType as keyof typeof websiteTypes].price;
    
    // Add addons
    config.addons.forEach(addon => {
      total += addons[addon as keyof typeof addons].price;
    });
    
    // Add SEO package
    total += seoPackages[config.seoPackage as keyof typeof seoPackages].price;
    
    // Add domain assistance
    if (config.domainAssistance) {
      total += 10;
    }
    
    setTotalPrice(total);
  };

  const toggleAddon = (addon: string) => {
    setConfig(prev => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon],
    }));
  };

  const toggleExpanded = (addon: string) => {
    setExpandedAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    );
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
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
            <span className="text-gray-900 dark:text-white">Build Your </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Perfect Website
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Configuration Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Website Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Package className="w-6 h-6 text-primary" />
                    {t('websiteType')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(websiteTypes).map(([key, { name, price }]) => (
                      <button
                        key={key}
                        onClick={() => setConfig({ ...config, websiteType: key })}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          config.websiteType === key
                            ? 'border-primary bg-primary/5 shadow-lg scale-105'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold text-lg">{name}</div>
                        <div className="text-primary font-bold text-xl">${price}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Add-ons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">{t('addons')}</h3>
                  <div className="space-y-3">
                    {Object.entries(addons).map(([key, { name, price, description }]) => (
                      <div key={key}>
                        <div
                          className={`rounded-xl border-2 transition-all ${
                            config.addons.includes(key)
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                          }`}
                        >
                          <button
                            onClick={() => toggleAddon(key)}
                            className="w-full p-4 text-left"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  config.addons.includes(key)
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                  {config.addons.includes(key) && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <div className="font-semibold text-lg">{name}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`text-sm font-bold ${
                                  price === 0 ? 'text-green-600 dark:text-green-400' : 'text-primary'
                                }`}>
                                  {price === 0 ? 'Free' : `+$${price}`}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpanded(key);
                                  }}
                                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                >
                                  <ChevronDown
                                    className={`w-5 h-5 transition-transform ${
                                      expandedAddons.includes(key) ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {expandedAddons.includes(key) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                                  {description}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* SEO Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">{t('seoPackage')}</h3>
                  <div className="space-y-3">
                    {Object.entries(seoPackages).map(([key, { name, price, description }]) => (
                      <div key={key}>
                        <div
                          className={`rounded-xl border-2 transition-all ${
                            config.seoPackage === key
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                          }`}
                        >
                          <button
                            onClick={() => setConfig({ ...config, seoPackage: key })}
                            className="w-full p-4 text-left"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  config.seoPackage === key
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}>
                                  {config.seoPackage === key && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <div className="font-semibold text-lg">{name}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`text-sm font-bold ${
                                  price === 0 ? 'text-green-600 dark:text-green-400' : 'text-primary'
                                }`}>
                                  {price === 0 ? 'Free' : `+$${price}`}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpanded(key);
                                  }}
                                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                >
                                  <ChevronDown
                                    className={`w-5 h-5 transition-transform ${
                                      expandedAddons.includes(key) ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {expandedAddons.includes(key) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                                  {description}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Domain Assistance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <button
                    onClick={() => setConfig({ ...config, domainAssistance: !config.domainAssistance })}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      config.domainAssistance
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">{t('domainAssistance')}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('domainDescription')}
                        </div>
                      </div>
                      <div className="text-primary font-bold text-xl">+$20</div>
                    </div>
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sticky Price Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="border-2 border-primary/30 shadow-2xl shadow-primary/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {t('totalCost')}
                    </div>
                    <motion.div
                      key={totalPrice}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2"
                    >
                      ${totalPrice}
                    </motion.div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('lifetimeHosting')}
                    </div>
                  </div>

                  {/* Selected Features Quote */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      {t('yourQuote')}
                    </h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {/* Website Type */}
                      <div className="flex items-start gap-2 text-sm p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-medium">
                            {websiteTypes[config.websiteType as keyof typeof websiteTypes].name}
                          </span>
                          <span className="text-primary ml-2">
                            ${websiteTypes[config.websiteType as keyof typeof websiteTypes].price}
                          </span>
                        </div>
                      </div>

                      {/* Selected Add-ons */}
                      {config.addons.map((addon) => (
                        <div key={addon} className="flex items-start gap-2 text-sm p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-medium">
                              {addons[addon as keyof typeof addons].name}
                            </span>
                            <span className={`ml-2 ${
                              addons[addon as keyof typeof addons].price === 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-primary'
                            }`}>
                              {addons[addon as keyof typeof addons].price === 0
                                ? 'Free'
                                : `+$${addons[addon as keyof typeof addons].price}`
                              }
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* SEO Package */}
                      {config.seoPackage !== 'none' && (
                        <div className="flex items-start gap-2 text-sm p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-medium">
                              {seoPackages[config.seoPackage as keyof typeof seoPackages].name}
                            </span>
                            <span className={`ml-2 ${
                              seoPackages[config.seoPackage as keyof typeof seoPackages].price === 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-primary'
                            }`}>
                              {seoPackages[config.seoPackage as keyof typeof seoPackages].price === 0
                                ? 'Free'
                                : `+$${seoPackages[config.seoPackage as keyof typeof seoPackages].price}`
                              }
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Domain Assistance */}
                      {config.domainAssistance && (
                        <div className="flex items-start gap-2 text-sm p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-medium">{t('domainAssistance')}</span>
                            <span className="text-primary ml-2">+$10</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full group relative overflow-hidden"
                    onClick={() => {
                      document.querySelector('#contact')?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    <span className="relative z-10">{t('getQuote')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    {t('noHiddenFees')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

