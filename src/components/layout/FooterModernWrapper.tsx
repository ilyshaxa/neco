'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FooterModern } from '@/components/ui/footer-modern';
import { Send, Phone, Mail } from 'lucide-react';
import { contactConfig } from '@/lib/config';

export function FooterModernWrapper() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { 
      name: t('nav.home'), 
      href: '#home',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      name: 'How It Works', 
      href: '#how-it-works',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      name: t('nav.pricing'), 
      href: '#pricing',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      name: t('nav.contact'), 
      href: '#contact',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  ];

  const sections = [
    {
      title: t('footer.quick_links'),
      links: quickLinks,
    },
    {
      title: t('footer.contact_us'),
      links: [
        {
          name: 'Telegram',
          href: contactConfig.telegram.url,
        },
        {
          name: t('contact.form.phone'),
          href: `tel:${contactConfig.phoneFormatted}`,
        },
        {
          name: t('hero.cta_primary'),
          href: '#contact',
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }
        },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        {
          name: t('footer.terms'),
          href: `/${locale}/terms`,
        },
        {
          name: t('footer.privacy'),
          href: `/${locale}/privacy`,
        },
      ],
    },
  ];

  const contactLinks = [
    {
      icon: <Send className="w-5 h-5" />,
      text: `@${contactConfig.telegram.handle}`,
      href: contactConfig.telegram.url,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: contactConfig.phone,
      href: `tel:${contactConfig.phoneFormatted}`,
    },
  ];

  return (
    <FooterModern
      logo={{
        url: `/${locale}`,
        title: 'Neco',
      }}
      sections={sections}
      description={t('footer.tagline')}
      contactLinks={contactLinks}
      copyright={`© ${currentYear} Neco. ${t('footer.rights')}`}
    />
  );
}

