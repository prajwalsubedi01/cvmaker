/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // If using `src` directory
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}