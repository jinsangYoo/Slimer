const path = require("path");
const { merge } = require("webpack-merge");
const common = require("../webpack.common.js");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [],
  module: {
    rules: [],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, "../tsconfig.json"),
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
