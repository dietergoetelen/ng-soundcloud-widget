var webpackConfig = require('./webpack.config');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'test/entry.ts',
      'src/**/*.test.ts'
    ],
    exclude: [],
    preprocessors: {
      'test/entry.ts': ['webpack'],
      'src/**/*.test.ts': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  });
};
