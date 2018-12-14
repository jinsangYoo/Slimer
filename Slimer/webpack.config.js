const path = require('path');

module.exports = {
  plugins: [],
  entry: {
    slimer: './src/default.js',
    109966: './src/109966.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      use: {
        loader: "babel-loader"
      }
    }]
  },
  devtool: 'source-map'
};
