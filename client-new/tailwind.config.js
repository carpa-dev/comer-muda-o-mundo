/**
 * Docs:
 *  - future: https://tailwindcss.com/docs/upcoming-changes
 *  - purge: https://tailwindcss.com/docs/controlling-file-size
 */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './**/*.html',
    './**/*.js',
    './**/*.jsx',
    './**/*.tsx',
  ],
  theme: {},
  variants: {},
  plugins: [],
};
