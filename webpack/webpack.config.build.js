const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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

const cssLoader = [     {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: publicPath
  }
},{
  loader: 'css-loader',
  options:config.cssLoaderOptions
}, {
  loader: 'postcss-loader',
  options: {
    plugins: postcssPlugins
  }
}]

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
      ].concat(cssLoader)
    }, {
      test: /\.scss$/,
      use: ["style-loader"].concat(cssLoader, "sass-loader")
    }, {
      test: /\.less$/,
      use: ["style-loader"].concat(cssLoader, "less-loader")
    }, {
      test: /\.styl$/,
      use: ["style-loader"].concat(cssLoader, "stylus-loader")
    }]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ]
  },
  plugins: plugins
})
