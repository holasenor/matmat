var webpack = require('webpack');
var path = require('path');
const nodeExternals = require('webpack-node-externals');

var jobs = [];

jobs.push({
  target: 'web',
  entry: ['babel-polyfill', './' + path.join('src','app.js')],
  output: {
    path: __dirname + '/static/js/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
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
  entry: ['babel-polyfill', './' + path.join('src', 'server', 'server.js')],
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
      }
    ]
  }
});

module.exports = jobs;
