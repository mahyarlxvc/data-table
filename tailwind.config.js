/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#0d0d0d",
        "secondary-dark": "#404040",
        "primary-red": "#e60000",
      }
    }
  },
  plugins: [],
}