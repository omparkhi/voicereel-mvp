/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1A56DB',
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1A56DB',
          800: '#1E3A8A',
          900: '#1E3370',
        },
        dark: {
          DEFAULT: '#0A0F1E',
          50:  '#1E293B',
          100: '#111827',
          200: '#0F172A',
          300: '#0A0F1E',
        },
        surface: {
          DEFAULT: '#111827',
          hover:   '#1E293B',
          border:  '#1E293B',
          input:   '#0F172A',
        },
        content: {
          DEFAULT:  '#F8FAFC',
          muted:    '#94A3B8',
          subtle:   '#64748B',
          disabled: '#334155',
        },
        accent: {
          DEFAULT: '#6366F1',
          light:   '#818CF8',
          dark:    '#4F46E5',
        },
        saffron: {
          DEFAULT: '#F59E0B',
          light:   '#FCD34D',
          dark:    '#D97706',
          bg:      '#451A03',
        },
        success: {
          DEFAULT: '#10B981',
          light:   '#34D399',
          bg:      '#022C22',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light:   '#FCD34D',
          bg:      '#451A03',
        },
        error: {
          DEFAULT: '#EF4444',
          light:   '#F87171',
          bg:      '#2D0A0A',
        },
        processing: {
          DEFAULT: '#3B82F6',
          bg:      '#0C1A3D',
        },
        border: {
          DEFAULT: '#1E293B',
          active:  '#1A56DB',
          muted:   '#0F172A',
        },
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'brand':       '0 0 20px rgba(26, 86, 219, 0.3)',
        'brand-lg':    '0 0 40px rgba(26, 86, 219, 0.4)',
        'glow':        '0 0 30px rgba(99, 102, 241, 0.3)',
        'saffron':     '0 0 20px rgba(245, 158, 11, 0.3)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.4)',
        'inner-brand': 'inset 0 0 20px rgba(26, 86, 219, 0.1)',
      },
      backgroundImage: {
        'brand-gradient':   'linear-gradient(135deg, #1A56DB 0%, #6366F1 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0A0F1E 0%, #111827 100%)',
        'card-gradient':    'linear-gradient(145deg, #111827 0%, #0F172A 100%)',
        'saffron-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      },
    },
  },
  plugins: [],
}