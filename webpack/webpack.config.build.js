const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const allConfig = require('../config/index.js')
const baseWebpackConfig = require('./webpack.base.js')
const postcssPlugins = require('./postcss.config.js')

const config = _.merge({}, allConfig, allConfig.PRODUCTION)

const imageLoaders = [{
  loader: 'url-loader',
  options: config.imgLoaderQuery
}]
const imageToBase64Loaders = [{
  loader: 'url-loader',
  options: {
    limit: '10000000'
  }
}]
const imageWebpackLoader = {
  loader: 'image-webpack-loader',
  options: config.imageWebpackLoader
}
config.enableImageMin && imageLoaders.push(imageWebpackLoader)
config.enableImageMin && imageToBase64Loaders.push(imageWebpackLoader)

const cssLoader = [{
  loader: 'css-loader',
  options: _.merge({}, config.cssLoaderOptions, {
    minimize: config.enableCSSCompress
  })
}, {
  loader: 'postcss-loader',
  options: {
    plugins: postcssPlugins
  }
}]

const publicPath = config.outputCssPublicPath || config.output.publicPath

const plugins = [
  new MiniCssExtractPlugin({
    filename: config.outputCss,
    allChunks: true
  }),
  new webpack.LoaderOptionsPlugin({
    // minimize: true
  })
]

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  entry: config.entry,
  module: {
    rules: [{
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|jpg|gif)(\?\S*)?$/,
      exclude: [/node_modules/].concat(config.imgToBase64Dir),
      use: imageLoaders
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|jpg|gif)(\?\S*)?$/,
      exclude: /node_modules/,
      include: config.imgToBase64Dir,
      use: imageToBase64Loaders
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: publicPath
          }
        },
        "css-loader",
      ]
    }, {
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: publicPath
          }
        },
        "css-loader",
        "sass-loader",
      ]
    }, {
      test: /\.less$/,
      use: [
        "style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: publicPath
          }
        },
        "css-loader",
        "less-loader",
      ]
    }, {
      test: /\.styl$/,
      use: [
        "style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: publicPath
          }
        },
        "css-loader",
        "stylus-loader",
      ]
    }]
  },
  plugins: plugins
})
