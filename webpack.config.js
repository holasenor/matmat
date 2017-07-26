var webpack = require('webpack');
module.exports = {
  entry: [
    "./src/app.js"
  ],
  output: {
    path: __dirname + '/static',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
        exclude: /node_modules/
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  },
  plugins: [
  ]
};
