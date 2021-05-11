module.exports = {
  purge: {
    enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
    content: ['./apps/**/*.{html,ts}'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
