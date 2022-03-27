var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./app.ts",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      // Babel 설정
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
            ],
          },
        },
        exclude: /(node_modules|dist)/,
      },

      // Stylesheet 설정
      {
        test: /\.s?(a|c)ss$/,
        use: [
          "style-loader",
          "css-loader", 
          "postcss-loader",
          "sass-loader",
        ],
        exclude: /(node_modules|dist)/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./app.html",
    }),
  ],

  devServer: {
    port: 8095,
  },
};