const _ = require('lodash')
const autoprefixer = require('autoprefixer')
const assets = require('postcss-assets')
const px2rem = require('postcss-plugin-px2rem')

const allConfig = require('../config/index.js')
const NODE_ENV = process.env.NODE_ENV || ''
const config = _.merge({}, allConfig, allConfig[NODE_ENV.toUpperCase()])

const postcssPlugins = [].concat(allConfig.postcssPlugins)

// assets
postcssPlugins.push(assets(config.assetsOptions))

// px2rem
if (config.enableREM) {
  postcssPlugins.push(px2rem(_.assign(config.px2remOptions, {
    rootValue: config.designLayoutWidth / config.baseSize,
  })))
}

// autoprefixer
postcssPlugins.push(autoprefixer(config.autoprefixerOptions))

module.exports = function () {
  return postcssPlugins
}
