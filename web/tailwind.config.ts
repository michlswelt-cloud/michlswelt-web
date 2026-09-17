import type { Config } from 'tailwindcss';

// Die Markenfarben und Schriften kommen zur Laufzeit aus Sanity (siteSettings)
// und werden im Root-Layout als CSS-Variablen gesetzt (siehe app/layout.tsx).
// Tailwind-Utilities wie `bg-brand-primary` greifen darauf zu, sodass sich
// das Design komplett im CMS pflegen laesst, ohne den Code anzufassen.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          background: 'var(--color-background)',
          text: 'var(--color-text)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        brand: 'var(--radius-base)',
      },
    },
  },
  plugins: [],
};

export default config;
