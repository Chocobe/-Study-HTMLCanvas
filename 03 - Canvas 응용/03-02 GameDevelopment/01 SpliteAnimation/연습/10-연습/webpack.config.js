var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "none",
  entry: "./src/index.ts",
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      // Babel Loader 설정
      {
        test: /\.(j|t)s$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  corejs: 3,
                  targets: [
                    "last 3 versions",
                    "ie >= 11",
                  ],
                },
              ],
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
            ],
          },
        },
        exclude: /(node_modules|dist)/,
      },

      // Style Loader 설정
      {
        test: /\.s?(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin(),
  ],

  devServer: {
    port: 8080,
    static: {
      directory: "./src",
    },
  },
}