var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // for now we set one entry for the main package.json entry
  entry: {
    app: ['./samples/example.js'],
  },

  output: {
    path: path.resolve('./build'),
    filename: 'assets/[name].min.js',
  },

  // resolve files
  // we reference a bunch of files in the build tool
  // command dir is the project path
  resolve: {
    extensions: ['.js', '.css'],
    modules: ['./node_modules'],
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env'],
          plugins: [[path.resolve('./libs/jsx.js'), { useVariables: true }]],
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader?name=images/.[ext]"
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Test Fixture',
      mobile: true,
      bodyHtmlSnippet: '<div id="root"></div>',
      template: require('html-webpack-template'),
      bodyHtmlSnippet: '<style>body{margin:0;font-family:arial;}</style>',
      links: []
    }),
  ],
};
