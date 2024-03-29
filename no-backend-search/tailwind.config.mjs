/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-light-custom-lighter-grey': '#f8f9fd',
        'bg-dark-finder-grey': '#202124',
      },
    },
  },
  plugins: [],
};
