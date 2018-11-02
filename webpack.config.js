const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.jsx'),
  mode: 'development',
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.json', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
};
