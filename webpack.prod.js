const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS 到单独文件
          {
            loader: 'css-loader', // 处理 CSS 模块和 @import
            options: {
              importLoaders: 1, // 允许 postcss-loader 和 sass-loader 处理 @import（对 SCSS 有效）
              sourceMap: false, // 生产环境禁用 sourceMap，减少文件大小
            },
          },
          {
            loader: 'postcss-loader', // 应用 PostCSS 插件（如 Tailwind、PostCSS Preset Env）
            options: {
              sourceMap: false, // 生产环境禁用 sourceMap
            },
          },
          {
            loader: 'sass-loader', // 编译 SCSS 到 CSS，仅对 .scss 文件生效
            options: {
              sourceMap: false, // 生产环境禁用 sourceMap
            },
          },
        ],
      },
    ],
  },
  optimization: {
    // 继承 Webpack 默认 minimizer (仅 Webpack 5+ 有效)
    minimizer: [
      // '...', // 保留默认的 JS 压缩 (如果存在)
      new TerserPlugin({
        parallel: true, // 启用并行处理，加速 JavaScript 压缩
        terserOptions: {
          ecma: 2020, // 指定 ECMAScript 2020 语法，支持现代特性（如 ?.、??），与 swc-loader 的 target: 'es2020' 一致
          compress: {
            drop_console: true, // 为 false 时保留 console.log、console.warn 等；设为 true 移除所有 console 语句，减小文件大小（生产环境推荐 true）
            unused: true, // 为 false 时保留未使用的变量/函数；设为 true 移除未使用代码（如未调用函数），支持 Tree Shaking（测试优化效果推荐 true）
            dead_code: true, // 为 false 时保留不可达代码；设为 true 移除不可达代码（如 if(false) 块），减小文件大小（生产环境推荐 true）
          },
          mangle: true, // 为 true 时压缩变量/函数名（如 myVariable -> a），减小文件大小；设为 false 保留原名，便于调试
          format: {
            comments: false, // 为 true 时保留所有注释，增加文件大小；设为 false 移除所有注释，减小文件大小（生产环境推荐 false）
          },
        },
      }),
      new CssMinimizerPlugin(),    // CSS 压缩
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // 最小 20KB 才拆分
      maxSize: 100000, // 最大 100KB，防止 chunk 过大
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      // 可选：配置白名单或动态类名
      safelist: {
        standard: [/^sm:/, /^md:/, /^lg:/, /^hover:/, /^focus:/,/^space-y-/], // 保留 Tailwind 动态类
        greedy: [/^custom-/], // 保留自定义类
      },
    })
  ],
});