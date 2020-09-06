/**
 * Custom setup with Tailwind CSS from:
 * https://github.com/vercel/next.js/blob/6233ef7ed89b9d369580a2ac13b6119bc4b18a1c/examples/with-tailwindcss/postcss.config.js#L1
 */
module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
};
