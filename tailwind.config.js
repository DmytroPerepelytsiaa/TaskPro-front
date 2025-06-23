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

        'font-primary-color': 'var(--font-primary-color)',
        'font-primary-hover-color': 'var(--font-primary-hover-color)',
        'font-secondary-color': 'var(--font-secondary-color)',
        'font-secondary-hover-color': 'var(--font-secondary-hover-color)',
        'font-accent-color': 'var(--font-accent-color)',
        'font-tertiary-color': 'var(--font-tertiary-color)',

        'button-primary-color': 'var(--button-primary-color)',
        'button-primary-hover-color': 'var(--button-primary-hover-color)',
        'button-secondary-color': 'var(--button-secondary-color)',
        'button-secondary-hover-color': 'var(--button-secondary-hover-color)',
        'button-accent-color': 'var(--button-accent-color)',
        'button-accent-hover-color': 'var(--button-accent-hover-color)',

        'icon-bg-primary-color': 'var(--icon-bg-primary-color)',
        'icon-primary-color': 'var(--icon-primary-color)',
        'icon-secondary-color': 'var(--icon-secondary-color)',
        'icon-accent-color': 'var(--icon-accent-color)',

        'header-background': 'var(--header-background)',
        'sidebar-background': 'var(--sidebar-background)',
        'sidebar-info-background': 'var(--sidebar-info-background)',
        'sidebar-dashboard-hover-background': 'var(--sidebar-dashboard-hover-background)',
        'sidebar-scrollbar-thumb-color': 'var(--sidebar-scrollbar-thumb-color)',
        'modal-background': 'var(--modal-background)',
        'logo-color': 'var(--logo-color)',
        'home-page-label-primary-text-color': 'var(--home-page-label-primary-text-color)',
        'home-page-label-secondary-text-color': 'var(--home-page-label-secondary-text-color)',
        'home-page-label-secondary-text-hover-color': 'var(--home-page-label-secondary-text-hover-color)',
        
        'black-2': 'var(--black-2)',
        'transparent-3': 'var(--transparent-3)',
        'green-1': 'var(--green-1)',
        'blue-1': 'var(--blue-1)',
        'red-2': 'var(--red-2)',
      },
      screens: {
        'xs': '375px',
      },
      spacing: {
        'header-height': 'var(--header-height)',
      }
    },
  },
  plugins: [],
}

