/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "cinema-red": {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary)",
          light: "var(--color-primary)"
        },
        "dark-obsidian": {
          DEFAULT: "#0A0A0A",
          light: "#171717"
        },
        "electric-blue": "var(--color-secondary)",
        "fusion-teal": "var(--color-accent)",
        "platinum-gray": "#E5E7EB",
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
