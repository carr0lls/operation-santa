var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: [
    'babel-polyfill', 
    path.resolve(__dirname, 'src/client.js')
  ],

  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'app.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.DefinePlugin({
      'process.env.BROWSER': true
    })
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-1' }
    ]
  }
}
