var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./index.ts",
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
      // Babel 설정
      {
        test: /\.(j|t)s$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "entry",
                  "corejs": 3,
                  "targets": {
                    "browsers": [
                      "last 3 versions",
                      "ie >= 11",
                    ],
                    "node": "current",
                  },
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

      // Stylesheet 설정
      {
        test: /\.s?(a|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
        exclude:/(node_modules|dist)/,
      },

      // File 설정
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: "file-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};