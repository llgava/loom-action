const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/patterns/mojang.yml', to: 'patterns/mojang.yml'}
      ],
    }),
    new LicenseWebpackPlugin({
      outputFilename: 'licenses.txt'
    })
  ],

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
