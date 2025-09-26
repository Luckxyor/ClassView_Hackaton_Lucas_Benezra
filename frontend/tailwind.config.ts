import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        secondary: {
          50: '#f3f5ff',
          100: '#e5e8ff',
          200: '#cdd3ff',
          300: '#b0b9ff',
          400: '#8d99ff',
          500: '#6f7aff',
          600: '#4c58ff',
          700: '#343fff',
          800: '#232ce6',
          900: '#1b22b3'
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        },
        warning: {
          50: '#fffcea',
          100: '#fff3c4',
          200: '#ffe79b',
          300: '#ffd66d',
          400: '#ffc242',
          500: '#ffa41b',
          600: '#db7d0f',
          700: '#b2570b',
          800: '#8d430e',
          900: '#71360f'
        }
      },
      boxShadow: {
        'soft-xl': '0 25px 50px -12px rgba(30, 64, 175, 0.15)'
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(79,70,229,0.2) 60%, rgba(14,116,144,0.08) 100%)'
      }
    }
  },
  plugins: []
};

export default config;
