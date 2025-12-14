'use client';

import { useTranslations } from 'next-intl';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function HeroGeometricWrapper() {
  const t = useTranslations('hero');

  const trustBadges = [
    t('trust_badge_1'),
    t('trust_badge_2'),
    t('trust_badge_3'),
    t('trust_badge_4'),
  ];

  const ctaPrimary = (
    <Button asChild size="lg" className="shadow-lg shadow-primary/20">
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#contact')?.scrollIntoView({
            behavior: 'smooth',
          });
        }}
      >
        {t('cta_primary')} <ArrowRight className="ml-2 w-5 h-5" />
      </a>
    </Button>
  );

  const ctaSecondary = (
    <Button 
      asChild 
      variant="outline" 
      size="lg"
      className="border-2 border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 backdrop-blur-sm"
    >
      <a
        href="#how-it-works"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#how-it-works')?.scrollIntoView({
            behavior: 'smooth',
          });
        }}
      >
        {t('cta_secondary')}
      </a>
    </Button>
  );

  return (
    <HeroGeometric
      title1={t('title1')}
      title2={t('title2')}
      description={t('description')}
      showCTA={true}
      ctaPrimary={ctaPrimary}
      ctaSecondary={ctaSecondary}
      trustBadges={trustBadges}
    />
  );
}

