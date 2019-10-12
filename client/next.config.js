const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  env: {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
  },
});
