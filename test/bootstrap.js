const projectPath = process.cwd(),
      path = require('path'),
      deleteDir = require('rimraf'),
      async = require('async'),
      testTools = require('we-test-tools'),
      ncp = require('ncp').ncp,
      We = require('../src');

let we;

// Add the stub plugin in node_modules folder:
before(function (callback) {
  testTools.copyLocalConfigIfNotExitst(projectPath, function() {
    const f = path.resolve(__dirname, 'testData/we-plugin-post'),
          d = path.resolve(process.cwd(), 'node_modules/we-plugin-post');

    ncp(f, d, callback);
  });
});

// prepare we.js core and load app features:
before(function (callback) {
  this.slow(100);

  we = new We({ bootstrapMode: 'test' });

  testTools.init({}, we);

  we.bootstrap({
    // disable access log
    enableRequestLog: false,

    i18n: {
      directory: path.resolve(__dirname, '..', 'config/locales'),
      updateFiles: true,
      locales: ['en-us']
    },
    themes: {}
  }, callback);
});

// start the server:
before(function (callback) {
  we.startServer(callback);
});

// after all tests remove test folders and delete the database:
after(function (callback) {
  testTools.helpers.resetDatabase(we, (err)=> {
    if(err) return callback(err);

    we.db.defaultConnection.close();

    const tempFolders = [
      path.resolve(process.cwd(), 'node_modules/we-plugin-post'),
      projectPath + '/files/tmp',
      projectPath + '/files/config',
      projectPath + '/files/sqlite',
      projectPath + '/files/uploads',
      projectPath + '/files/templatesCacheBuilds.js'
    ];

    async.each(tempFolders, (folder, next)=> {
      deleteDir( folder, next);
    }, (err)=> {
      if (err) throw new Error(err);
      callback();
    });
  });
});