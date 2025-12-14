'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, TrendingUp, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { pricingConfig } from '@/lib/config';

interface PricingConfig {
  websiteType: string;
  addons: string[];
  seoPackage: string;
}

const websiteTypes = {
  landing: { 
    name: 'Landing Page', 
    price: pricingConfig.websites.landing,
    description: 'Perfect for showcasing your business with a single, impactful page'
  },
  multipage: { 
    name: 'Multi-Page Website', 
    price: pricingConfig.websites.multipage,
    description: 'Comprehensive website with multiple pages for detailed information'
  },
  custom: { 
    name: 'Custom Design', 
    price: pricingConfig.websites.custom,
    description: 'Unique, tailor-made design that perfectly matches your brand'
  },
  ecommerce: { 
    name: 'E-commerce', 
    price: pricingConfig.websites.ecommerce,
    description: 'Full online store with product management and payment integration'
  },
};

const freeFeatures = [
  { name: 'Lifetime Hosting', description: 'Your website hosted forever with 99.9% uptime guarantee' },
  { name: 'Lifetime Support', description: 'Unlimited technical support as long as your site is with us' },
  { name: 'SSL Certificate', description: 'Secure HTTPS encryption for visitor trust and better SEO' },
  { name: 'Mobile Optimized', description: 'Perfect display on all mobile devices and tablets' },
  { name: 'Fast Performance', description: 'Optimized code and images for lightning-fast loading' },
  { name: 'Custom Animations', description: 'Professional animations to make your site more engaging' },
];

const paidAddons = {
  email: { 
    name: 'Business Email', 
    price: pricingConfig.addons.email,
    description: 'Professional email addresses using your domain (e.g., info@yourbusiness.com)'
  },
  booking: { 
    name: 'Booking System', 
    price: pricingConfig.addons.booking,
    description: 'Allow clients to book appointments or services directly on your website'
  },
  forms: { 
    name: 'Contact Forms', 
    price: pricingConfig.addons.forms,
    description: 'Custom contact and inquiry forms to capture leads'
  },
  analytics: { 
    name: 'Analytics', 
    price: pricingConfig.addons.analytics,
    description: 'Track visitors and understand your audience with Google Analytics'
  },
  chat: { 
    name: 'Live Chat', 
    price: pricingConfig.addons.chat,
    description: 'Real-time chat support to engage with your customers'
  },
  blog: { 
    name: 'Blog System', 
    price: pricingConfig.addons.blog,
    description: 'Share news, articles, and updates with a fully-featured blog'
  },
  payment: { 
    name: 'Payment Integration', 
    price: pricingConfig.addons.payment,
    description: 'Accept online payments with integrated payment gateway'
  },
};

const seoPackages = {
  none: { name: 'No SEO', price: 0 },
  basic: { name: 'Basic SEO', price: pricingConfig.seo.basic },
  standard: { name: 'Standard SEO', price: pricingConfig.seo.standard },
  premium: { name: 'Premium SEO', price: pricingConfig.seo.premium },
};

export function PricingCalculatorModern() {
  const t = useTranslations('pricingCalculator');
  
  // Generate website types with translations
  const websiteTypesLocalized = {
    landing: { 
      name: t('websiteTypes.landing'), 
      price: websiteTypes.landing.price,
      description: websiteTypes.landing.description
    },
    multipage: { 
      name: t('websiteTypes.multipage'), 
      price: websiteTypes.multipage.price,
      description: websiteTypes.multipage.description
    },
    custom: { 
      name: t('websiteTypes.custom'), 
      price: websiteTypes.custom.price,
      description: websiteTypes.custom.description
    },
    ecommerce: { 
      name: t('websiteTypes.ecommerce'), 
      price: websiteTypes.ecommerce.price,
      description: websiteTypes.ecommerce.description
    },
  };
  
  const [config, setConfig] = useState<PricingConfig>({
    websiteType: 'multipage',
    addons: [],
    seoPackage: 'none',
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  useEffect(() => {
    let total = websiteTypesLocalized[config.websiteType as keyof typeof websiteTypesLocalized].price;
    
    config.addons.forEach(addon => {
      total += paidAddons[addon as keyof typeof paidAddons].price;
    });
    
    total += seoPackages[config.seoPackage as keyof typeof seoPackages].price;
    
    setTotalPrice(total);
  }, [config]);

  const toggleAddon = (addon: string) => {
    setConfig(prev => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon],
    }));
  };

  return (
    <section id="pricing" className="min-h-screen flex items-center py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            <span className="text-gray-900 dark:text-white">{t('titlePart1')} </span>
            <span className="bg-gradient-to-r from-emerald-500 via-gray-800 to-green-500 dark:from-emerald-300 dark:via-white/90 dark:to-green-300 bg-clip-text text-transparent">
              {t('titlePart2')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left: Service Selection */}
          <div className="space-y-4">
            {/* Website Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t('sectionTitle')}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(websiteTypesLocalized).map(([key, { name, price, description }]) => (
                  <div key={key} className="relative">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setConfig({ ...config, websiteType: key })}
                      className={`w-full p-3 rounded-xl border-2 transition-all ${
                        config.websiteType === key
                          ? 'border-emerald-400 bg-gradient-to-br from-emerald-500/10 to-green-500/5 dark:bg-[#161B22]'
                          : 'border-gray-200 dark:border-[#30363D] hover:border-emerald-400/50 hover:dark:bg-[#1C2128] bg-white dark:bg-[#161B22]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{name}</h4>
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${price}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {config.websiteType === key && (
                            <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div
                            className="relative"
                            onMouseEnter={() => setHoveredInfo(key)}
                            onMouseLeave={() => setHoveredInfo(null)}
                          >
                            <div className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-help">
                              <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            
                            <AnimatePresence>
                              {hoveredInfo === key && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute z-50 bottom-full right-0 mb-2 w-64 p-3 rounded-lg bg-white dark:bg-[#1C2128] border border-gray-200 dark:border-[#30363D] shadow-2xl dark:shadow-emerald-500/20"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white dark:bg-[#1C2128] border-r border-b border-gray-200 dark:border-[#30363D] transform rotate-45" />
                                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Premium Add-ons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t('premiumAddons')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(paidAddons).map(([key, { name, price, description }]) => (
                  <div key={key} className="relative">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleAddon(key)}
                      className={`w-full p-2 rounded-lg border-2 transition-all text-left ${
                        config.addons.includes(key)
                          ? 'border-emerald-400 bg-emerald-500/10 dark:bg-[#161B22]'
                          : 'border-gray-200 dark:border-[#30363D] hover:border-emerald-400/50 hover:dark:bg-[#1C2128] bg-white dark:bg-[#161B22]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                            config.addons.includes(key)
                              ? 'border-emerald-400 bg-emerald-400'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {config.addons.includes(key) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs text-gray-900 dark:text-white truncate">{name}</div>
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+${price}</div>
                          </div>
                        </div>
                        <div
                          className="relative flex-shrink-0"
                          onMouseEnter={() => setHoveredInfo(`addon-${key}`)}
                          onMouseLeave={() => setHoveredInfo(null)}
                        >
                          <div className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-help">
                            <Info className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                          </div>
                          
                          <AnimatePresence>
                            {hoveredInfo === `addon-${key}` && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-50 bottom-full right-0 mb-2 w-56 p-3 rounded-lg bg-white dark:bg-[#1C2128] border border-gray-200 dark:border-[#30363D] shadow-2xl dark:shadow-emerald-500/20"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="absolute -bottom-1 right-2 w-2 h-2 bg-white dark:bg-[#1C2128] border-r border-b border-gray-200 dark:border-[#30363D] transform rotate-45" />
                                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SEO Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                SEO Package
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(seoPackages).map(([key, { name, price }]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setConfig({ ...config, seoPackage: key })}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      config.seoPackage === key
                        ? 'border-emerald-400 bg-emerald-500/10 dark:bg-[#161B22]'
                        : 'border-gray-200 dark:border-[#30363D] hover:border-emerald-400/50 hover:dark:bg-[#1C2128] bg-white dark:bg-[#161B22]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-gray-900 dark:text-white mb-1">{name}</div>
                    <div className={`text-sm font-bold ${
                      price === 0 ? 'text-gray-500 dark:text-gray-400' : 'text-emerald-500 dark:text-emerald-400'
                    }`}>
                      {price === 0 ? 'Free' : `+$${price}`}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Your Quote */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Your Quote</h3>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="sticky top-24"
            >
              <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border-2 border-gray-200 dark:border-[#30363D] shadow-2xl dark:shadow-emerald-500/5 flex flex-col h-full min-h-[600px]">
                {/* Selected Items */}
                <div className="space-y-2 mb-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500/30 dark:scrollbar-thumb-emerald-400/20 scrollbar-track-gray-100 dark:scrollbar-track-slate-800">
                  {/* Website Package */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#1C2128] border border-gray-200 dark:border-[#30363D]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {websiteTypesLocalized[config.websiteType as keyof typeof websiteTypesLocalized].name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      ${websiteTypesLocalized[config.websiteType as keyof typeof websiteTypesLocalized].price}
                    </span>
                  </div>

                  {/* Free Features */}
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-3 mb-2">Always Included (FREE)</div>
                  {freeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#0D1117] border border-gray-200 dark:border-[#30363D]/50">
                      <div className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">{feature.name}</span>
                      </div>
                      <span className="text-xs text-emerald-500 dark:text-emerald-400/60 font-medium">FREE</span>
                    </div>
                  ))}

                  {/* Selected Add-ons */}
                  {config.addons.length > 0 && (
                    <>
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-3 mb-2">{t('premiumAddons')}</div>
                      {config.addons.map((addon) => (
                        <div key={addon} className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#1C2128] border border-gray-200 dark:border-[#30363D]">
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              {paidAddons[addon as keyof typeof paidAddons].name}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            +${paidAddons[addon as keyof typeof paidAddons].price}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  {/* SEO Package */}
                  {config.seoPackage !== 'none' && (
                    <>
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-3 mb-2">SEO Package</div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#1C2128] border border-gray-200 dark:border-[#30363D]">
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {seoPackages[config.seoPackage as keyof typeof seoPackages].name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          +${seoPackages[config.seoPackage as keyof typeof seoPackages].price}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Total Price */}
                <div className="border-t border-gray-200 dark:border-[#30363D] pt-4 mb-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">Total Investment</span>
                    <motion.div
                      key={totalPrice}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent"
                    >
                      ${totalPrice}
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-500 text-right">One-time • No hidden fees</p>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
                >
                  <span className="flex items-center justify-center gap-2 text-sm">
                    Get This Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>Limited slots this month</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

