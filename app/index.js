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
          type    : 'expand',
          message : 'Run npm install? ',
          name    : 'runNpmInstall',
          store   : true,
          default : false,
          choices : [
            { key: 'y' , name: 'Yes' , value: true  },
            { key: 'n' , name: 'No'  , value: false }
          ]
        }
      ], 
      answers => {
        this.appname = this.helper.cleanAppname(answers.appname);
        this.authorName = answers.authorName;
        this.authorEmail = answers.authorEmail;
        this.runNpmInstall = answers.npmInstall;
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
          start: "node_modules/.bin/webpack-dev-server --port 3000 --content-base public/",
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
        presets: [ 'es2015', 'react', 'stage-0' ]
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
     ['app.js', 'reducers.js', 'actions.js'].forEach(
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
        'react',
        'react-dom',
        'react-dev-server',
        'webpack',
        'babel-core',
        'babel-cli',
        'babel-preset-es2015',
        'babel-preset-react',
        'babel-preset-stage-0',
        'babel-loader',
        'css-loader',
        'style-loader',
        'less-loader',
        'less',
        'less-plugin-clean-css',
        'imports-loader',
        'exports-loader',
        'redux',
        'react-redux',
        'redux-logger',
        'redux-thunk'
      ], { 
        'saveDev': true 
      });
    }
  },

  end: {
  }
});
