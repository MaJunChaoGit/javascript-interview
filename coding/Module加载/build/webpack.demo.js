const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('nav[hash].css');
const extractCSS = new ExtractTextPlugin('third[hash].css');
const extractSCSS = new ExtractTextPlugin('main[hash].css');

const config = require('./config');
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
var webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './examples/index.js'
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: '[name].js',
    sourcePrefix: '',
    chunkFilename: '[name].js',
    publicPath: isProd
      ? './'
      : '/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    publicPath: '/',
    noInfo: true
  },
  amd: {
    toUrlUndefined: true
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  optimization: {},
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.cwd(), './examples/index.html'),
      inject: true
    })
  ]
};

if (isProd) {
  // webpackConfig.entry.vendor = './src/index.js';
  webpackConfig.module.rules.push(
    {
      test: /\.css$/,
      loader: extractCSS.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      })
    }
  );
  webpackConfig.module.rules.push(
    {
      test: /\.scss$/,
      use: extractSCSS.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      })
    }
  );
  webpackConfig.module.rules.push(
    {
      test: /\.less$/,
      use: extractLESS.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'less-loader']
      })
    }
  );
  webpackConfig.plugins.push(
    extractCSS,
    extractLESS,
    extractSCSS
  );
  webpackConfig.optimization.runtimeChunk = {
    name: 'manifest'
  };
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -20,
        chunks: 'all'
      }
    }
  };
}

if (isDev) {
  webpackConfig.module.rules.push(
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader']
    }
  );
  webpackConfig.module.rules.push(
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }
  );
  webpackConfig.module.rules.push(
    {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }
  );
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = webpackConfig;
