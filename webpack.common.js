const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const pkg = require('./package.json')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    main: './src/index.ts',
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      templateParameters: {
        env: isProduction ? '' : '(개발용)',
      },
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [],
  },
}
