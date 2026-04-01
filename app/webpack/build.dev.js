const webpack = require('webpack')
// const webpackBaseConfig = require('./config/webpack.base')
const webpackConfig = require('./config/webpack.prod.js')
console.log('\nbuiding.......\n')

webpack(webpackConfig, (err, stats) => {
   if(err) { console.log(err); return }
   process.stdout.write(`${stats.toString({
      colors: true, //在控制台输出色彩信息
      module: false, // 不显示出每个模块打包信息
      children: false, // 不显示子编译任务的信息
      chunks: false, // 不显示每个代码块的信息
      chunkModules: true // 显示代码中模块信息
   })}\n`)
})