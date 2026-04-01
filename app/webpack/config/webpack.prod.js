const path = require('path');
const os = require('os');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


// 基类配置
const baseConfig = require('./webpack.base.js');

// 生产环境 webpack 配置
const webpackConfig = merge.smart(baseConfig, {
  // 指定生产环境
  mode: 'production',

  // 生产环境的 output 配置
  output: {
    filename: 'js/[name]_[chunkhash:8].bundle.js',
    chunkFilename: 'js/[name]_[chunkhash:8].chunk.js',
    path: path.join(process.cwd(), './app/public/dist/prod'),
    publicPath: '/dist/prod/',
    crossOriginLoading: 'anonymous',
    clean: true // 自动清理输出目录
  },

  // 模块规则
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        include: [
          // 只对业务代码进行 babel，加快 webpack 打包速度
          path.resolve(process.cwd(), './app/pages'),
          path.resolve(process.cwd(), './app/controller'),
          path.resolve(process.cwd(), './app/service')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },

  // 插件配置
  plugins: [
    // 1. 每次 build 前清空 public/dist 目录
    new CleanWebpackPlugin('app/public/dist/prod', {
      root: process.cwd(),
      verbose: true,
      exclude: ['.gitkeep']
    }),

    // 2. 提取 CSS 公共部分
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css',
      chunkFilename: 'css/[name]_[contenthash:8].chunk.css',
      ignoreOrder: true
    }),


    // 5. 环境变量注入
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString())
    }),

    // 6. 不发送用户身份认证
    new webpack.DefinePlugin({
      'process.env.SEND_CREDENTIALS': JSON.stringify(false)
    })
  ],

  // 优化配置
  optimization: {
    // 1. 使用 terserPlugin 的并发和缓存
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length, // 多线程压缩
        cache: true, // 启用缓存
        terserOptions: {
          compress: {
            drop_console: true, // 清除 console.log
            drop_debugger: true, // 清除 debugger
            pure_funcs: ['console.info', 'console.debug', 'console.trace'], // 清除特定函数
            warnings: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false, // 移除注释
            ascii_only: true // 转义非ASCII字符
          }
        }
      }),

      // 2. 优化压缩 CSS
      new CssMinimizerPlugin({
        parallel: os.cpus().length, // 多线程压缩CSS
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true // 移除所有注释
              },
              normalizeWhitespace: false // 保留空白字符以支持 CSS 预处理器
            }
          ]
        },
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cssoMinify,
          CssMinimizerPlugin.cleanCssMinify
        ]
      })
    ],

    // 分割代码优化
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 提取公共依赖
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          chunks: 'all'
        },
        // 提取 CSS
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20
        },
        // 提取公共业务代码
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    },

    // 运行时优化
    runtimeChunk: {
      name: 'runtime'
    }
  },

  // 性能优化
  performance: {
    hints: 'warning',
    maxAssetSize: 250000, // 单个文件最大 250KB
    maxEntrypointSize: 500000, // 入口点最大 500KB
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    }
  }
});

module.exports = webpackConfig;