const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {

  devtool: 'inline-source-map',

  entry: {
    app:path.join(__dirname,'src/app')
  },

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.vue$/, loader: 'vue' }
    ]
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
      // 'vue-router': path.join(__dirname, '..', 'src')
    }
  },

  // Expose __dirname to allow automatically setting basename.
  // context: __dirname,
  node: {
    __dirname: true
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}
