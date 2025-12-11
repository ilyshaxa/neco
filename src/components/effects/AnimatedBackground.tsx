'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white dark:bg-[#0D1117]">
      {/* Shimmer Particles - Stars */}
      {[...Array(40)].map((_, i) => {
        const colors = ['#97f7f3', '#76f6bd', '#69c1ff', '#419f91'];
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: color,
              boxShadow: `0 0 ${4 + Math.random() * 6}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}

