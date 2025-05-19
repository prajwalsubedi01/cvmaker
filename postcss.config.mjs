// const config = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
//   content: [
//   "./src/app/**/*.{js,ts,jsx,tsx}",
//   "./src/components/**/*.{js,ts,jsx,tsx}",
//   "./src/types/**/*.{js,ts,jsx,tsx}", 
// ],

// };

// export default config;
// tailwind.config.js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/types/**/*.{js,ts,jsx,tsx}",
  ],
};
export default config;