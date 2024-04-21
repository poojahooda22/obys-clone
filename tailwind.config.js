/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '430px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/assets/image/hero-image.jpg')",
      }
    },
  },
  plugins: [],
}

