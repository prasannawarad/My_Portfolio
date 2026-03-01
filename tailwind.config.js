/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',
        'primary-dark': '#B5952F',
        'background-light': '#F0F2F1',
        'background-dark': '#0B1416',
        'surface-dark': '#132326',
        'surface-accent': '#1C3338',
        'code-bg': '#080F10',
        'text-main': '#E2E8F0',
        'text-muted': '#94A3B8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
