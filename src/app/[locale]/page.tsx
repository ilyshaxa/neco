import { HeroGeometricWrapper } from '@/components/sections/HeroGeometricWrapper';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PricingCalculatorModern } from '@/components/sections/PricingCalculatorModern';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { Contact } from '@/components/sections/Contact';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <HeroGeometricWrapper />
      <HowItWorks />
      <PricingCalculatorModern />
      <TestimonialsSection />
      <Contact />
    </>
  );
}

