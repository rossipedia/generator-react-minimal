import webpack from 'webpack';
import { readFileSync } from 'fs';

const babelRc = JSON.parse(readFileSync(`${__dirname}/.babelrc`));

const env = process.env.NODE_ENV;

const config = {
  context: `${__dirname}/src`,
  entry: './app',
  output: {
    path: `${__dirname}/dist`,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: babelRc
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === "production") {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    })
  );
}


export default config;
