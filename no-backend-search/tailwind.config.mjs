/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': '#f8f9fd',
        'bg-primary-dark': '#202124',
      },
    },
  },
  plugins: [],
};
