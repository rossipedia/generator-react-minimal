import { readFileSync } from 'fs';
import LessPluginCleanCSS from 'less-plugin-clean-css';

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
      { test: /\.less$/, loader: 'style!css!less' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: babelRc
      }
    ]
  },
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({advanced: true})
    ]
  }
};