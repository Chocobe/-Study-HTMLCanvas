var path = require("path");
var HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./src/app.ts",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".js", ".ts", ".scss"],
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
                      "ie >= 11",
                      "last 3 versions",
                    ],
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

      // Babel 설정
      {
        test: /\.s?(c|a)ss$/,
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
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  devServer: {
    liveReload: true,
    static: {
      directory: "./src",
    },
  },
};