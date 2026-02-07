/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',  // Tablet start
      'md': '768px',
      'lg': '1024px', // Desktop start
      'xl': '1280px', // Large Desktop
      '2xl': '1536px',
    },
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
        },
        status: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error: 'var(--color-error)',
          info: 'var(--color-info)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          focus: 'var(--color-border-focus)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        // H1: 72px (lg) -> 48px (md) -> 36px (sm)
        'h1-lg': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1-md': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1-sm': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],

        // H2: 48px -> 36px -> 28px
        'h2-lg': ['48px', { lineHeight: '1.2' }],
        'h2-md': ['36px', { lineHeight: '1.2' }],
        'h2-sm': ['28px', { lineHeight: '1.3' }],

        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }], // Minimum for inputs
        lg: ['18px', { lineHeight: '1.5' }],
        xl: ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        '3xl': ['32px', { lineHeight: '1.3' }],
        '4xl': ['48px', { lineHeight: '1.2' }],
        '5xl': ['64px', { lineHeight: '1.1' }],
        '6xl': ['72px', { lineHeight: '1.1' }],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px var(--color-accent-primary)' },
          '50%': { boxShadow: '0 0 20px var(--color-accent-primary)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out forwards',
        'slide-up': 'slide-up 300ms ease-out forwards',
        'scale-in': 'scale-in 300ms spring forwards',
        'pulse-slow': 'pulse 3s infinite ease-in-out',
        glow: 'glow 2s infinite ease-in-out',
      },
      boxShadow: {
        'glow': '0 0 10px var(--color-accent-primary)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      }
    },
  },
  plugins: [],
}
