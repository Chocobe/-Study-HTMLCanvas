var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: path.resolve(__dirname, "app.ts"),
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // 🚀 webpack 의 resolve 기본값에는 .ts 가 없기 때문에, 직접 명시해 주어야 합니다.
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
  },

  module: {
    rules: [
      {
        // babel 설정
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
      {
        // stylesheet 설정
        test: /\.s?(c|a)ss$/,
        use: [
          "style-loader",
          "css-loader",
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
    port: 8090,
  },
};
