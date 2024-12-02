import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "input": "0px 15px 15px -15px",
        "light-teal": "border-b-teal-600 shadow-teal-600 shadow-input transition-all"
      },
      keyframes: {
        down: {
          '0%': { transform: 'translateY(-10px)', opacity: '0'},
          '100%': { transform: 'translateY(0px)', opacity: '100%'}
        },
        up: {
          '0%': { transform: 'translateY(10px)', opacity: '0'},
          '100%': { transform: 'translateY(0px)', opacity: '100%'}
        },
        right: {
          '0%': { transform: 'translateX(-10px)', opacity: '0'},
          '100%': { transform: 'translateX(0px)', opacity: '100%'}
        },
        left: {
          '0%': { transform: 'translateX(10px)', opacity: '0'},
          '100%': { transform: 'translateX(0px)', opacity: '100%'}
        }
      },
      animation: {
        up: 'up .5s linear',
        down: 'down .5s linear',
        right: 'right .5s linear',
        left: 'left .3s linear',
      },
    },
  },
  plugins: [],
}

