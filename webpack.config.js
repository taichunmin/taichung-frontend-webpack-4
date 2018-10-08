const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')

module.exports = {
  // 處理不同作業系統下 資料夾的符號不同的問題
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map', // 能在 Chrome F12 看到行號
  devServer: { // 開發用伺服器的位置
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'html', 'index.html'),
      filename: path.resolve(__dirname, 'dist', 'index.html')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'html', 'main.html'),
      filename: path.resolve(__dirname, 'dist', 'main.html')
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/icons'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/sprite/sprite.png'),
        css: path.resolve(__dirname, 'src/sprite/sprite.css')
      },
      apiOptions: {
        cssImageRef: "sprite.png"
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(c|s[ac])ss$/,
        use: [ // 順序很重要
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: '/images'
            }
          },
          {
            loader: "image-webpack-loader",
          }
        ]
      }
    ]
  }
}