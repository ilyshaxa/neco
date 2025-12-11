import { HeroModern } from '@/components/sections/HeroModern';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PricingCalculatorModern } from '@/components/sections/PricingCalculatorModern';
import { Contact } from '@/components/sections/Contact';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <HeroModern />
      <HowItWorks />
      <PricingCalculatorModern />
      <Contact />
    </>
  );
}

