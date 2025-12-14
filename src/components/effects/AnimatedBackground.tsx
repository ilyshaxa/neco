'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  left: number;
  top: number;
  color: string;
  duration: number;
  delay: number;
  boxShadowSize: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const colors = ['#97f7f3', '#76f6bd', '#69c1ff', '#419f91'];
    const generatedParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: colors[i % colors.length],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      boxShadowSize: 4 + Math.random() * 6,
    }));
    setParticles(generatedParticles);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white dark:bg-[#0D1117]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white dark:bg-[#0D1117]">
      {/* Shimmer Particles - Stars */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
          className="absolute w-[2px] h-[2px] rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.boxShadowSize}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

