var webpack = require('webpack');
var path = require('path');
const nodeExternals = require('webpack-node-externals');

var jobs = [];

jobs.push({
  entry: ["./src/app.js"],
  externals: [nodeExternals()],
  output: {
    path: __dirname + '/static',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
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
