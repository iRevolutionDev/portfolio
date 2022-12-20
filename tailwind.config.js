/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // 23202A 1E1B24 19181F background colors
      dark: {
        50: '#313244',
        100: '#23202A',
        200: '#1E1B24',
        300: '#19181F',
      },
      'brand-name': '#fa8787'
    }
  },
  plugins: [],
}
