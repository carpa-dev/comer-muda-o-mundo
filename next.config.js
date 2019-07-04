const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');

module.exports = withTypescript(
  withCSS({
    env: {
      GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
    },
    target: 'serverless',
  }),
);
