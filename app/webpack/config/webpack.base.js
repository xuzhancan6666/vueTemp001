/*
    webpack基础配置
*/
const glob = require('glob')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// 思考：多页面。entry入口的重复性。htmlwebpaclPlugin 的重复性。
// 抽离重复内容。利用glob + 规则匹配  => 输出 配置
// 获取 app/pages 下的所有 入口问天。 entry.xxx.js
const entrysAll = {}
const HtmlWebpackPluginArray = []

const enrtyPath = path.resolve(process.cwd(), './app/pages/**/entry.*.js');
glob.sync(enrtyPath).forEach((file) => {
   const entryName = path.basename(file, '.js');
   // './app/pages/page1/entry.page1.js' => 'entry.page1'
   entrysAll[entryName] = file

   HtmlWebpackPluginArray.push(
      new HtmlWebpackPlugin({
         // 产物 （最终模版）：输出路径
         // vue目标入口文件/app/pages/**/entry.*.js。
         // 结合/app/view/entry.tpl 模版。生成最终的模版文件。 entry.page1.tpl
         filename: path.resolve(process.cwd(), './app/public/dist/', `${entryName}.tpl`),
         template: path.resolve(process.cwd(), './app/view/entry.tpl'),
         chunks: [entryName]
      })
   )
})

module.exports = {
   // 入口配置
   // entry: {
   //    'entry.page1': './app/pages/page1/entry.page1.js',
   //    'entry.page2': './app/pages/page2/entry.page2.js',
   // },
   // 优化加载入口配置写法
   entry: entrysAll,
   // source-map
   devtool: 'eval-cheap-module-source-map',
   // 模块解析. 更具文件类型匹配loader
   module: {
      rules: [{
         test: /\.vue$/,
         use: {
            loader: 'vue-loader'
         }
      },{
         test: /\.js$/,
         include:[
            // 只对业务代码进行babel。加速打包
            path.resolve(process.cwd(), './app/pages')
         ],
         use: {
            loader: 'babel-loader'
         }
      },{
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',          // 推荐使用 url-loader，它内部集成了 file-loader
            options: {
              limit: 8 * 1024,              // 小于 8KB 转为 Base64
              name: 'images/[name].[hash].[ext]', // 输出文件名格式
              outputPath: 'assets',         // 输出目录（相对于 output.path）
            },
          },
        ],
      },{
         test: /\.less$/,
         use: [ 'style-loader', 'css-loader', 'less-loader']
      },
      {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
      }]
   },
   // 产物输出目标位置。 因为开发和生产不一致。需要根据环境 进行分别配置
   // output: {
   //    filename: 'js/[name]_[chunkhash:8].bundle.js',
   //    path: path.join(process.cwd(), './app/public/dist/prod'),
   //    publicPath: '/dist/prod',
   //    crossOriginLoading: 'anonymous'
   // },
   // 配置模块解析的具体行文。定义webpack 在打包时。如何找到并解析具体模块路径
   // alias用于我们开发便捷性。通过import xxx from. $page/xxx/xxx
   resolve: {
      extensions: ['.js', '.vue', '.less', '.css'],
      alias: {
         $pages: path.resolve(process.cwd(), './app/pages'),
         $boot: path.resolve(process.cwd(), './app/pages/boot'),
         $common: path.resolve(process.cwd(), './app/pages/common'),
         $widgets: path.resolve(process.cwd(), './app/pages/widgets'),
         $store: path.resolve(process.cwd(), './app/pages/store')
      }
   },
   // 配置 webpacl 优化插件
   plugins: [
      // 处理 .vue 文件，这个插件是必须的
      // 它的功能是将你定义过的其他规则复制并应用到 .vue 文件里。
      // 例如，如果有一张匹配规则 /\.js$/ 的规则，那么它会应用到 .vue 文件中的 <script> 模块中 或者 <style>
      new VueLoaderPlugin(),
      // 把第三方库暴露到 window context 下
      // 它会自动在该模块的顶部添加 import Vue from 'vue'（或 require('vue')）
      new webpack.ProvidePlugin({
         Vue: 'vue',
         axios: 'axios',
         __loadash: 'loadash'
      }),
      // 定义全局常量
      new webpack.DefinePlugin({
         __VUE_OPTIONS_API__: 'true', // 支持 vue 解析 optionsApi
         __VUE_PROD_DEVTOOLS__: 'false', // 禁用 Vue 调试工具
         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' // 禁用生产环境显示 "水合" 信息
      }),
      // 2. 负责 <template> 里的组件 (<el-button>, <el-form>...)
      Components({
         resolvers: [ElementPlusResolver()],
         exclude: [/node_modules/],
      }),
      // 构造最终渲染的 模版 页面
      // 它的目标是根据指定的模板文件生成一个最终可用的模板文件（entry.page1.tpl），
      // 并自动注入 webpack 打包后的静态资源（如 JS、CSS 等）
      // new HtmlWebpackPlugin({
      //    // 产物 （最终模版）：设置输出路径
      //    filename: path.resolve(process.cwd(), './app/public/dist/', 'entry.page1.tpl'),
      //    // 指定需要 使用的模版。
      //    template: path.resolve(process.cwd(), './app/view/entry.tpl'),
      //    chunks: ['entry.page1']
      // }),
      //  new HtmlWebpackPlugin({
      //    // 产物 （最终模版）：输出路径
      //    filename: path.resolve(process.cwd(), './app/public/dist/', 'entry.page2.tpl'),
      //    template: path.resolve(process.cwd(), './app/view/entry.tpl'),
      //    chunks: ['entry.page2']
      // }),
      // htmlwebpack优化写法
      ...HtmlWebpackPluginArray
   ],
   // 配置打包输出优化 （代码分割，模块合并，缓存，treeShaking，压缩优化等策略）
   optimization: {
      // splitchunks 配置。可以 通过我们的 test规则匹配。输出我们需要拆分的chunks
      /*
         把 js 文件打包出来 3类型。最大化利用缓存策略。
         1.vendor 改动频率低。第三方库。改动率： 最低
         2.common 业务组件用到的公用库。改动率： 次级
         3.entry.{page}: 项目页面组件内容。改动率: 高
      */
      splitChunks: {
         chunks: 'all', // 对局部和异步模块都进行分离
         /*
            这两个配置就是 Webpack 的“防拥堵机制”。如果拆分出来的文件数量超过了这个限制，
            Webpack 就会停止拆分或者合并文件，以保证页面加载速度最快。
         */
         maxInitialRequests: 10, // 打开这个页面时，HTML 文件里直接引用的 JS/CSS 文件数量，不能超过 10 个
         maxAsyncRequests: 10, // 当用户进入某个页面，需要加载这个页面的所有异步资源时，同时发起的网络请求不能超过 10 个
         cacheGroups: {
            vendor: { // 第三方依赖库
               test: /[\\/]node_modules[\\/]/, // 打包 node_module 中的文件
               name: 'vendor', // 模块名称
               priority: 20, // 优先级，数字越大，优先级越高
               enforce: true, // 强制执行
               reuseExistingChunk: true, // 复用已有的公共 chunk
            },
            common: { // 公共模块
               name: 'common', // 模块名称
               minChunks: 2, // 被两处引用即被归为公共模块
               minSize: 1, // 最小分割文件大小 (1 byte)
               priority: 10, // 优先级
               reuseExistingChunk: true, // 复用已有的公共 chunk
            }
         }
      }
   }
}