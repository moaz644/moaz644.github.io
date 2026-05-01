import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 50px rgba(14, 165, 233, 0.28)',
        orange: '0 0 50px rgba(249, 115, 22, 0.22)'
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};

export default config;
