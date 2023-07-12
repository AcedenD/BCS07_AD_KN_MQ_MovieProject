/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        // create your own class (h-70vh)
        "70vh": "70vh",
      },
    },
  },
  plugins: [],
};
