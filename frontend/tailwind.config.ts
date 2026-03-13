import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#E8EAF2',
        backdrop: '#0D1020',
        panel: '#161B33',
        accent: '#7C8CF8'
      },
      boxShadow: {
        soft: '0 8px 40px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: []
};

export default config;
