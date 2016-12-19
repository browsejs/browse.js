module.exports = function(config) {
  config.set({
    basePath: process.cwd(),
    frameworks: ['jasmine'],
    files: [
      'browse.min.js',
      'tests/src/js/jasmine/*.js'
    ],
    reporters: ['kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
