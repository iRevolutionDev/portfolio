const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primaryBlack': '#111827',
        'primaryWhite': '#ffffff',
      },
      fontFamily: {
        sans: ["'Basier Circle'", ...fontFamily.sans],
      },
      listStyleType: {
        disc: 'disc',
        decimal: 'decimal',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.grey.900'),
            a: {
              color: theme('colors.grey.900'),
              '&:hover': {
                color: theme('colors.grey.700'),
              },
              code: { color: theme('colors.blue.400') },
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
            thead: {
              borderBottomColor: theme('colors.grey.200'),
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          css: {
            color: theme('colors.grey.200'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
              code: { color: theme('colors.blue.400') },
            },
            blockquote: {
              borderLeftColor: theme('colors.grey.700'),
              color: theme('colors.grey.300'),
            },
            'h2,h3,h4': {
              color: theme('colors.grey.100'),
              'scroll-margin-top': spacing[32],
            },
            hr: { borderColor: theme('colors.grey.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.grey.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.grey.500') },
              },
            },
            strong: { color: theme('colors.grey.100') },
            thead: {
              color: theme('colors.grey.100'),
              borderBottomColor: theme('colors.grey.600'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.grey.700'),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-neumorphism')],
}
