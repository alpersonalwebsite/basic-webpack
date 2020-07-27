const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: ['./src/app.js']
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]-bundle.js',
    publicPath: '/'
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
      // {
      //   test: /\.html$/,
      //   use: [
      // {
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].html'
      //   }
      // },
      // {
      //   loader: 'extract-loader'
      // },
      // extract-loader == separate file not included in the bundle,
      // {
      //   loader: 'html-loader',
      //   options: {
      //     attributes: {
      //       list: [
      //         {
      //           tag: 'img',
      //           attribute: 'src',
      //           type: 'src'
      //         }
      //       ]
      //     }
      //   }
      // }

      //   ]
      // },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
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
  plugins: [
    new MiniCSSExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
