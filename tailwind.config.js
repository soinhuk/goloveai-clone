/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gl-dark': '#0F0E0F',
        'gl-dark-2': '#181718',
        'gl-dark-3': '#1a1a1a',
        'gl-pink': '#FF18A0',
        'gl-purple': '#D05BF8',
        'gl-border': 'rgba(255,255,255,0.05)',
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(135deg, #d05bf8 0%, #ff18a0 100%)',
        'pink-gradient-hover': 'linear-gradient(135deg, #e070ff 0%, #ff3db0 100%)',
        'purple-gradient': 'linear-gradient(135deg, #d05bf8 0%, #9927eb 100%)',
        'hero-gradient': 'linear-gradient(135deg, #d05bf8 0%, #ff18a0 50%, #ff7eb3 100%)',
        'dark-gradient': 'linear-gradient(180deg, #181718 95%, transparent 100%)',
      },
      borderRadius: {
        'gl': '22px',
        'gl-sm': '16px',
        'gl-xs': '12px',
        'gl-input': '25px',
      },
      spacing: {
        'gl-section': '72px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flash': 'flash 1.2s steps(1) infinite',
        'float-y': 'floatY 2.5s ease-in-out infinite alternate',
        'border-beam': 'borderBeam 4s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatY: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FF18A0, 0 0 10px #FF18A0' },
          '100%': { boxShadow: '0 0 20px #FF18A0, 0 0 30px #FF18A0' },
        },
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        borderBeam: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      screens: {
        'desktop': '1024px',
      },
      maxWidth: {
        'container': '1900px',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}