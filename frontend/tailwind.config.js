/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Corrected pattern for all files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
