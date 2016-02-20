import { readFileSync } from 'fs';

const babelRc = JSON.parse(readFileSync(`${__dirname}/.babelrc`));

export default {
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
  }
};
