const path = require('path');
const webpack = require('webpack');

// To use the dev version, rename this file to webpack.config.babel.js (the .babel is missing atm)
// eslint-disable-next-line import/no-unresolved
const CarteBlanche = require('../../webpack-plugin/dist/index');

const commonEntrypoints = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
];
// bundle currently only contains phonesystem stuff hence this name
const entrypoints = {
  main: [...commonEntrypoints, './src/index'],
  foobar: [...commonEntrypoints, './src/index.foobar'],
};

module.exports = {
  devtool: 'eval',
  entry: entrypoints,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
    libraryTarget: 'var',
    library: '[name]',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CarteBlanche({ componentRoot: './src' }),
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-1'],
      },
      exclude: /node_modules/,
      include: [path.join(__dirname, 'src')],
    },
    ],
  },
};
