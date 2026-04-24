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
        // Brand colors extracted from NusaBeeTrip logo
        brand: {
          // Primary blue - ocean/sky theme for Nusa Penida
          blue: {
            50: '#EFF6FF',
            100: '#DBEAFE',
            200: '#BFDBFE',
            300: '#93C5FD',
            400: '#60A5FA',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
            800: '#1E40AF', // Primary blue from logo
            900: '#1E3A8A',
            950: '#172554',
          },
          // Primary orange - tropical sunset/bee theme
          orange: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F97316',
            600: '#EA580C',
            700: '#C2410C',
            800: '#FFB800', // Primary orange from logo
            900: '#92400E',
            950: '#431407',
          },
          // Accent teal - tropical water theme
          teal: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9', // Accent teal from logo
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
            950: '#082F49',
          },
          // Secondary green - tropical nature theme
          green: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A',
            700: '#15803D',
            800: '#166534',
            900: '#14532D',
          }
        },
        // WhatsApp green for booking buttons
        whatsapp: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#25D366', // WhatsApp brand color
          600: '#16A34A',
          700: '#15803D',
          800: '#128C7E', // Darker WhatsApp green
          900: '#14532D',
          DEFAULT: '#25D366',
          light: '#4ADE80',
          dark: '#128C7E',
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#0EA5E9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgb(30 64 175) 0%, rgb(14 165 233) 50%, rgb(255 184 0) 100%)',
        'section-gradient': 'linear-gradient(to right, rgba(30, 64, 175, 0.05), rgba(14, 165, 233, 0.05))',
        'brand-gradient': 'linear-gradient(135deg, rgb(30 64 175), rgb(14 165 233))',
        'sunset-gradient': 'linear-gradient(135deg, rgb(255 184 0), rgb(249 115 22))',
        'ocean-gradient': 'linear-gradient(135deg, rgb(14 165 233), rgb(30 64 175))',
      }
    },
  },
  plugins: [],
}