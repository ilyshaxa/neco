import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Emerald green
          light: '#34d399',
          dark: '#059669',
        },
        accent: {
          DEFAULT: '#00ff00', // Bright green
          dark: '#0a0a0a',
        },
        neon: {
          green: '#00ff00',
          emerald: '#10b981',
        },
        surface: {
          DEFAULT: '#161B22', // Card/Surface background
          hover: '#1C2128', // Hover state
          active: '#21262D', // Active/pressed state
        },
        border: {
          DEFAULT: '#30363D', // Subtle borders
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(16, 185, 129, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

