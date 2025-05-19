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
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/types/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",     // Instead of oklch(), use HEX
        secondary: "#F59E0B",
        neutral: "#F3F4F6",
        dark: "#1F2937",
        light: "#E5E7EB",
      },
    },
  },
  plugins: [],
};

export default config;
