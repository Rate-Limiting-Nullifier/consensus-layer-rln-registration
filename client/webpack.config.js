const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

const {
  NODE_ENV = 'production',
} = process.env;

var config = {
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
};

const serverConfig = Object.assign({}, config, {
  target: 'node',
  entry: {
    server: './client/src/index.ts'
  },
  node: {
    __dirname: false
  },
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
});

const appConfig = Object.assign({}, config, {
  target: ['web'],
  experiments: { topLevelAwait: true },
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  entry: {
    app: './client/src/public/app.ts',
  },
  devtool: 'inline-source-map',
  externals: [],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
          extractCSS: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      }
    ],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/public'),
    clean: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "client/src/public/index.html", to: "index.html" },
        { from: "client/src/public/images", to: "images" },
      ],
    }),
  ]
});

module.exports = [serverConfig, appConfig];