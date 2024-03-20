/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "via-color": "rgba(210, 155, 66, 1)",
      },
    },
  },
  plugins: [],
};
