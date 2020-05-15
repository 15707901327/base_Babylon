const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//引用HtmlWebpackPlugin插件
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//引用CleanWebpackPlugin插件

module.exports = {
  entry: './src/example',
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `[name]-[hash:4].js`
  },
  module: {
    rules: [
      {test: /\.ts$/, use: 'ts-loader'}
    ]
  },
  //配置HtmlWebpackPlugin插件
  plugins: [
    new HtmlWebpackPlugin({
      title: '测试',
      filename: 'example.html',
      template: path.resolve(__dirname, 'src/template.html')
    }),
    //配置CleanWebpackPlugin插件
    new CleanWebpackPlugin()
  ],
  //配置SplitChunksPlugin
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          minSize: 1
        }
      }
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  }
};