var path = require('path');
var fs = require('fs');
var ExternalsPlugin = require('webpack-externals-plugin');

var webpack = require('webpack');
var packagesDir = path.join(__dirname, '..');
var reactScriptsPackage = require('./package.json');

reactScriptsPackage.bundledDependencies = fs.readdirSync(packagesDir)
  .filter((name) => reactScriptsPackage.dependencies[name]);

//var nodeExternals = require('./node-externals');

module.exports = {
  entry: {
    // build: './scripts/start.js',
    // eject: './scripts/eject.js',
    // init: './scripts/init.js',
    start: './scripts/start.js',
    // test: './scripts/test.js',
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    pathinfo: true
  },
  module: {
    loaders: [
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    // // require
    // unknownContextRegExp: /$^/,
    // unknownContextCritical: false,
    //
    // // require(expr)
    // exprContextRegExp: /$^/,
    // exprContextCritical: false,
    //
    // // require("prefix" + expr + "surfix")
    // wrappedContextRegExp: /node_modules\/webpack\//,
    // wrappedContextCritical: true
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: []
    })
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  externals: [
    'append-transform',
    'emitter',
    'spawn-sync'
  ]
}
