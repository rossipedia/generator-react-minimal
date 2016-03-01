var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  helper: {
    cleanAppname: appname => {
      var appname = appname.replace(/\s/g, '-');
      return appname;
    }
  },

  initializing: function() {
    this.appname = this.helper.cleanAppname(this.appname);
  },

  prompting: {
    userInput: function() {
      var done = this.async();

      this.prompt([
        {
          type    : 'input',
          name    : 'appname',
          message : 'App name',
          default : this.appname
        },
        {
          type    : 'input',
          name    : 'authorName',
          message : 'Author name',
          default : this.authorName,
          store   : true
        },
        {
          type    : 'input',
          name    : 'authorEmail',
          message : 'Author email',
          default : this.authorEmail,
          store   : true
        },
        {
          type    : 'list',
          message : 'Run npm install? ',
          name    : 'runNpmInstall',
          store   : true,
          default : "No",
          choices : [
            "Yes",
            "No"
          ]
        }
      ],
      answers => {
        this.appname = this.helper.cleanAppname(answers.appname);
        this.authorName = answers.authorName;
        this.authorEmail = answers.authorEmail;
        this.runNpmInstall = answers.runNpmInstall == "Yes";
        done();
      });
    }
  },

  configuring: {
  },

  default: {
  },

  writing: {

    packageFile: function () {
      var packageData = {
        name: this.appname,
        version: "1.0.0",
        scripts: {
          start: "node_modules/.bin/webpack-dev-server --inline --hot --port 3000 --content-base public/",
          build: "node_modules/.bin/cross-env NODE_ENV=production node_modules/.bin/webpack",
          test: "echo \"Error: no test specified\" && exit 1"
        },
        keywords: [
          'react',
          'redux',
          'webpack'
        ],
        author: {
          name: this.authorName,
          email: this.authorEmail
        },
        license: "ISC"
      };

      this.fs.writeJSON(this.destinationPath( 'package.json' ), packageData, undefined, 2);
    },

    babelRc: function () {
      const opts = {
        presets: [ 'es2015', 'react', 'stage-0' ],
        plugins: [ 'transform-decorators-legacy' ]
      };

      this.fs.writeJSON(
        this.destinationPath('.babelrc'),
        opts,
        undefined,
        2);
    },

    webpackConfig: function () {
      this.fs.copyTpl(
        this.templatePath('webpack.config.babel.js'),
        this.destinationPath('webpack.config.babel.js'),
        {}
      );
    },

    srcFiles: function () {
     ['app.js'].forEach(
       f => {
         const src = this.templatePath(`src/${f}`);
         const dst = this.destinationPath(`src/${f}`);
         this.fs.copy(src, dst);
       }
     );
    },

    publicFiles: function() {
      ['index.html'].forEach(
        f => {
          const src = this.templatePath(`public/${f}`);
          const dst = this.destinationPath(`public/${f}`);
          this.fs.copy(src, dst);
        }
      );
    }
  },

  conflicts: {
  },

  install: {
    npmModules: function() {

      if (!this.runNpmInstall)
        return;

      this.npmInstall([
        'babel-core',
        'babel-loader',
        'babel-plugin-transform-decorators-legacy',
        'babel-preset-es2015',
        'babel-preset-react',
        'babel-preset-stage-0',
        'cross-env',
        'react',
        'react-dom',
        'react-redux',
        'redux',
        'redux-logger',
        'redux-thunk',
        'webpack',
        'webpack-dev-server'
      ], {
        'saveDev': true
      });
    }
  },

  end: {
  }
});
