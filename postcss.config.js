module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // Use the correct Tailwind CSS PostCSS plugin
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 2,
      // browsers: 'last 2 versions, > 1%',
    }),
  ]
};