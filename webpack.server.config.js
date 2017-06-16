var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill', 
    path.resolve(__dirname, 'src/server.js')
  ],

  output: {
    filename: path.resolve(__dirname, 'src/server.bundle.js')
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: false,
    __dirname: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': false
    })
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-1' }
    ]
  }

}