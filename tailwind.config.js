/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'black-1': 'var(--black-1)',
        'black-2': 'var(--black-2)',
        'black-3': 'var(--black-3)',
        'black-4': 'var(--black-4)',
        'black-5': 'var(--black-5)',
        'transparent-black': 'var(--transparent-black)',
        'white-1': 'var(--white-1)',
        'green-1': 'var(--green-1)',
        'red-1': 'var(--red-1)',
      }
    },
  },
  plugins: [],
}

