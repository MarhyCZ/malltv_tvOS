require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const srcRoot = path.resolve(__dirname, 'src/')
const distRoot = path.resolve(__dirname, 'dist/')

const entry = {
  app: srcRoot + '/app.js'
}
const output = {
  path: distRoot,
  filename: '[name].js'
}

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

const stats = {
  modules: false,
  chunks: false,
  colors: true
}

module.exports = {
  devtool: isProd ? 'source-map' : 'eval-source-map',
  mode: isProd ? 'production' : 'development',
  entry: entry,
  output: output,
  resolve: {
    alias: {
      'handlebars': 'handlebars/runtime.js',
      'react': path.resolve('./node_modules/react'),
    },
    modules: [srcRoot, 'node_modules']
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules|bower_components|native/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/react',
            '@babel/env',
          ],
          plugins: [
            'react-require',
            '@babel/transform-runtime'
          ],
          cacheDirectory: true,
        }
      }]
    }, {
      test: /\.hbs$/,
      use: [{
        loader: 'handlebars-loader'
      }]
    }, {
      test: /\.css$|\.json/,
      use: [{
        loader: 'raw-loader'
      }]
    }, {
      test: /\.(png|jpe?g)$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash].[ext]',
          publicPath: '/',
        },
      },
    }]
  },
  plugins: [
    new CopyPlugin([
      { from: srcRoot + '/assets', to: distRoot + '/assets' }
    ])
  ],
  devServer: {
    contentBase: distRoot,
    compress: true,
    inline: false,
    port: 9001,
    stats
  }
}
