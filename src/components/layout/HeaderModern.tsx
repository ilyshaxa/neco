'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function HeaderModern() {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  const links = [
    {
      label: t('nav.home'),
      href: '#home',
    },
    {
      label: 'How It Works',
      href: '#how-it-works',
    },
    {
      label: t('nav.pricing'),
      href: '#pricing',
    },
    {
      label: t('nav.contact'),
      href: '#contact',
    },
  ];

  React.useEffect(() => {
    if (open) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll
      document.body.style.overflow = '';
    }
    // Cleanup when component unmounts (important for Next.js)
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full max-w-7xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
        {
          'bg-white/70 dark:bg-[#0D1117]/70 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-[#0D1117]/50 border-primary/30 dark:border-primary/30 backdrop-blur-lg md:top-4 md:max-w-6xl md:shadow-lg md:shadow-primary/10':
            scrolled && !open,
          'bg-white/90 dark:bg-[#0D1117]/90': open,
          'bg-transparent': !scrolled && !open,
        },
      )}
    >
      <nav
        className={cn(
          'flex h-16 w-full items-center justify-between px-6 md:h-14 md:transition-all md:ease-out',
          {
            'md:px-4': scrolled,
          },
        )}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-2xl font-bold relative group"
        >
          <span className={cn(
            'transition-colors duration-300',
            scrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
          )}>N</span>
          <span className="text-primary">eco</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a
              key={i}
              className={buttonVariants({ 
                variant: 'ghost',
                className: cn(
                  'transition-colors duration-300',
                  'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                )
              })}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {link.label}
            </a>
          ))}
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* CTA Button */}
          <Button 
            asChild
            size="sm" 
            className="ml-2"
          >
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {t('hero.cta_primary')}
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button 
            size="icon" 
            variant="outline" 
            onClick={() => setOpen(!open)}
            className="border-gray-300 dark:border-border-DEFAULT"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'bg-white/95 dark:bg-[#0D1117]/95 fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-gray-200 dark:border-border-DEFAULT md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
            'flex h-full w-full flex-col justify-between gap-y-2 p-6',
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'justify-start text-gray-700 dark:text-gray-300',
                })}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col gap-2">
            <Button className="w-full">
              {t('hero.cta_primary')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

