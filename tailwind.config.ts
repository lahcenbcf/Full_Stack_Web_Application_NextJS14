/*
--text: #0a1017;
--background: #fbfcfd;
--primary: #5b89bb;
--secondary: #b79bd6;
--accent: #ba73c5;
*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5b89bb',
        'text-color':'#0a1017',
        'secondary':'#b79bd6',
        'background':'#fbfcfd'
      }
    },
  },
  plugins: [],
}