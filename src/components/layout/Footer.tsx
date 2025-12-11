'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Phone, Send } from 'lucide-react';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-slate-950 dark:bg-[#0D1117] text-white border-t border-gray-800 dark:border-primary/20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-primary-light mb-4">Neco</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/necoagency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-primary-light transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>@necoagency</span>
              </a>
              <a
                href="tel:+998900000000"
                className="flex items-center gap-2 text-gray-300 hover:text-primary-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+998 90 000 00 00</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-light transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact_us')}</h4>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              className="inline-block px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-medium transition-colors"
            >
              {t('hero.cta_primary')}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Neco. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

