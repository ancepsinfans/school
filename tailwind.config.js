module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': 'var(--main-color)',
        'accent-red': 'var(--accent-red)',
        'accent-blue': 'var(--accent-blue)',
        'accent-yellow': 'var(--accent-yellow)',
        'accent-brown': 'var(--accent-brown)',
        'accent-white': 'var(--accent-white)',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
