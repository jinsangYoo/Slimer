const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  devtool: "source-map",
  mode: "production",
  entry: {
    main: "./src/Slimer.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "slimer-[name].js",
  },
  plugins: [new HtmlWebpackPlugin(), new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "css-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendors",
    },
  },
};
