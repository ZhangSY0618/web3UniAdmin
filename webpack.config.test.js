const { merge } = require('webpack-merge'); // 合并多个 Webpack 配置文件（将通用配置与测试配置结合）
const common = require('./webpack.common.js'); // 引入通用 Webpack 配置
const path = require('path'); // Node.js 模块，用于处理文件路径
const glob = require('glob'); // 用于匹配文件路径模式（PurgeCSS 使用）
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将 CSS 提取到单独文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩 CSS 输出
const TerserPlugin = require('terser-webpack-plugin'); // 压缩 JavaScript 输出
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin'); // 移除未使用的 CSS

module.exports = merge(common, {
  mode: 'production', // 设置为生产模式，启用优化（如代码压缩）
  devtool: false, // 禁用 source map，简化输出并加快构建（调试时可设为 'source-map'）
  module: {
    rules: [
      {
        test: /\.scss$/, // 匹配 SCSS 文件
        use: [
          MiniCssExtractPlugin.loader, // 将 SCSS 提取为单独的 CSS 文件
          {
            loader: 'css-loader', // 处理 CSS 导入和模块
            options: {
              importLoaders: 1, // 允许 postcss-loader 处理 @import 语句
            },
          },
          'postcss-loader', // 应用 PostCSS 插件（如 Tailwind、autoprefixer）
          'sass-loader', // 将 SCSS 编译为 CSS
        ],
      },
      {
        test: /\.css$/, // 匹配纯 CSS 文件
        use: [
          MiniCssExtractPlugin.loader, // 将 CSS 提取为单独文件
          {
            loader: 'css-loader', // 处理 CSS 导入和模块
            options: {
              importLoaders: 1, // 允许 postcss-loader 处理 @import 语句
            },
          },
          'postcss-loader', // 应用 PostCSS 插件
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
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
      new CssMinimizerPlugin(), // 压缩 CSS 文件，优化 MiniCssExtractPlugin 的输出
    ],
    splitChunks: {
      chunks: 'all', // 将公共代码和第三方库拆分为单独的 chunk，优化缓存
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // CSS 输出文件名，带内容哈希以实现缓存失效
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }), // 扫描 src 目录，查找使用的 CSS 类
      // safelist: ['dynamic-class', /^custom-prefix-/] // 可选：设置白名单，保留动态类（如 Tailwind 的 sm:、hover:）
    }),
  ],
});