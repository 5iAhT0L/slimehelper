/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slime: {
          50:  '#f0fdf0',
          100: '#dcfce0',
          200: '#bbf7c4',
          300: '#86efac',
          400: '#4ade7b',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        obsidian: {
          50:  '#f6f6f8',
          100: '#e0e0e8',
          200: '#c1c1d1',
          300: '#9999b4',
          400: '#737393',
          500: '#555577',
          600: '#3f3f60',
          700: '#2a2a45',
          800: '#18182e',
          900: '#0e0e1c',
          950: '#07070f',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'slime-radial': 'radial-gradient(ellipse at center, #14532d 0%, #07070f 70%)',
        'chat-gradient': 'linear-gradient(180deg, #0e0e1c 0%, #07070f 100%)',
      },
      animation: {
        'slime-pulse': 'slimePulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'particle': 'particle 8s linear infinite',
        'typing': 'typing 1.2s steps(3) infinite',
      },
      keyframes: {
        slimePulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 8px #22c55e40, 0 0 16px #22c55e20' },
          '100%': { boxShadow: '0 0 20px #22c55e80, 0 0 40px #22c55e40' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(40px)', opacity: '0' },
        },
        typing: {
          '0%': { content: '"."' },
          '33%': { content: '".."' },
          '66%': { content: '"..."' },
        },
      },
      boxShadow: {
        'slime': '0 0 20px #22c55e40, 0 0 60px #22c55e20',
        'slime-lg': '0 0 40px #22c55e60, 0 0 80px #22c55e30',
        'obsidian': '0 4px 32px #07070faa',
      },
    },
  },
  plugins: [],
}
