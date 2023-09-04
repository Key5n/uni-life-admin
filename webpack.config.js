const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const env = process.env.NODE_ENV === 'production' ? process.env : dotenv.config({ path: '.env.local' }).parsed;;

console.log('webpack', env);

module.exports = {
  entry: "./index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  target: "web",
  devServer: {
    port: "3000",
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // eslint-disable-next-line no-undef
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
  ],
};
