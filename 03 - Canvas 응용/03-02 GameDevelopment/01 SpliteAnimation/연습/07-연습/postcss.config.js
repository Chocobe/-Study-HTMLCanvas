var tailwindcss = require("tailwindcss");
var autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    "postcss-preset-env",
    tailwindcss,
    autoprefixer,
  ],
};