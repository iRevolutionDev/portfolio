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
      'brand-name': '#fa8787',
      'ctp-surface0': '#313244',
      'ctp-surface1': '#45475a',
      'ctp-text': '#cdd6f4',
      'ctp-overlay0': '#a6adc8'
    }
  },
  plugins: [],
}
