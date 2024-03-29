/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-grey-custom': '#f8f9fd',
        'dark-grey-custom': '#202124',
      },
    },
  },
  plugins: [],
};
