var webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

var jobs = [];

jobs.push({
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
});

jobs.push({
  target: 'node',
  externals: [nodeExternals()],
  entry: ["./src/server/server.js"],
  output: {
    path: __dirname + '/bld',
    filename: 'serverBundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  }
});

module.exports = jobs;
