const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['./src/app.js']
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'public',
    port: 9000,
    hot: true,
    overlay: true,
    stats: {
      colors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
          // Remember css-loader will run first
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            loader: 'extract-loader'
          },
          // extract-loader == separate file not included in the bundle,
          {
            loader: 'html-loader',
            options: {
              attributes: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src'
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
          // Remember css-loader will run first
        ]
      }
    ]
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './public/index.html'
  //   })
  // ]
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
