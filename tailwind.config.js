/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'tertiary-color': 'var(--tertiary-color)',
        'accent-color': 'var(--accent-color)',
        'danger-color': 'var(--danger-color)',
        'header-background': 'var(--header-background)',
        'sidebar-background': 'var(--sidebar-background)',
        'sidebar-info-background': 'var(--sidebar-info-background)',
        'modal-background': 'var(--modal-background)',
        'logo-color': 'var(--logo-color)',
        'text-primary-color': 'var(--text-primary-color)',
        'text-primary-hover-color': 'var(--text-primary-hover-color)',
        'text-secondary-color': 'var(--text-secondary-color)',
        'text-secondary-hover-color': 'var(--text-secondary-hover-color)',
        'button-accent-color': 'var(--button-accent-color)',
        'button-accent-hover-color': 'var(--button-accent-hover-color)',
        'icon-primary-color': 'var(--icon-primary-color)',
        'icon-secondary-color': 'var(--icon-secondary-color)',
        'home-page-label-primary-text-color': 'var(--home-page-label-primary-text-color)',
        'home-page-label-secondary-text-color': 'var(--home-page-label-secondary-text-color)',
        'home-page-label-secondary-text-hover-color': 'var(--home-page-label-secondary-text-hover-color)',
        'black-1': 'var(--black-1)',
        'black-2': 'var(--black-2)',
        'black-3': 'var(--black-3)',
        'black-4': 'var(--black-4)',
        'black-5': 'var(--black-5)',
        'transparent-black': 'var(--transparent-black)',
        'white-1': 'var(--white-1)',
        'green-1': 'var(--green-1)',
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
}

