const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = merge(common, {
  devtool: "source-map",
  mode: "development",
  plugins: [],
  devServer: {
    hot: true,
    inline: true,
    host: "0.0.0.0",
    port: 8080,
  },
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, "tsconfig.dev.json"),
      }),
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendors",
    },
  },
});
