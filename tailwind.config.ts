import type { Config } from 'tailwindcss';

/**
 * Vulpine design tokens.
 * NOTE: these are proposed values. If approved Vulpine brand hex values exist,
 * replace them here and in src/app/globals.css — nowhere else.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          900: '#0E1012', // darkest ground
          800: '#15181B',
          700: '#1D2124',
          600: '#2A2F33',
          500: '#3C4247',
        },
        warm: {
          50: '#FAF8F5', // warm white
          100: '#F4F1EC',
          200: '#E7E2D9', // stone
          300: '#D6CFC3',
          400: '#B8AF9F',
        },
        ink: '#101214',
        // Brand accent carried over from the existing Vulpine site (#F97316).
        vulpine: {
          DEFAULT: '#F97316',
          600: '#EA6A0C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        label: '0.16em',
      },
      maxWidth: {
        container: '84rem',
        prose: '68ch',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '2px',
      },
      transitionDuration: { DEFAULT: '180ms' },
    },
  },
  plugins: [],
};

export default config;
