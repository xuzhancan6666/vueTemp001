const merge = require('webpack-merge')
// 基础类 配置
const baseConfig = require('./webpack.base.js');
const path = require('path')
// 生产配置 webpack 配置
const webpackConfig = merge.smart(baseConfig, {
   mode: 'development',
   output: {
   }
})

module.exports = webpackConfig