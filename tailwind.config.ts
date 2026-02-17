import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        phosphor: '#00ff41',
        'phosphor-dim': '#00cc33',
        'phosphor-dark': '#003300',
        cyan: '#00ffff',
        amber: '#ffb000',
        'off-white': '#e0e0e0',
        'term-bg': '#0a0a0a',
        'term-border': '#333333',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        terminal: '4px',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { textShadow: '0 0 4px #00ff4140' },
          '100%': { textShadow: '0 0 8px #00ff4160, 0 0 16px #00ff4120' },
        },
      },
    },
  },
  plugins: [],
}

export default config
