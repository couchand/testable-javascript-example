(function() {

  // test mode -- 'tdd', 'bdd-should', or 'bdd-expect'
  var testMode = 'tdd';
  var testModes = {
    'tdd': function() {
      window.assert = chai.assert;
    },
    'bdd-should': function() {
      window.shouldchai = chai.should();
      chai.Assertion.prototype.throwError = chai.Assertion.prototype.throw;
    },
    'bdd-expect': function() {
      window.expect = chai.expect;
    }
  };

  testModes[testMode] && testModes[testMode]();

  require.config({
    // Interpret module names in terms of the application's base directory.
    // This allows us to use the application configuration data without
    // modification (see below).
    baseUrl: "../../www/js",
    paths: {
      templates: '../templates',
      'jquery.simulate': '../lib/jquery.simulate',
      tests: '../../test/tests',
      fixtures: '../../test/fixtures',
      squire: '../lib/squire'
    },

    shim: {
      'jquery.simulate': {
        deps: [ 'jquery' ]
      }
    }
  });

  // Define a fake "main" module to prevent Require.js from loading the app's
  // true "main" module (which is unecessary for unit testing)
  define("main", function() {});

  mocha.setup({
    ui: testMode.split('-')[0],
    globals: [ 'XMLHttpRequest' ]
  });

  require([
    // Load the app's Require.js configuration file
    '../../www/js/config',
    // Load the list of test files
    '../../test/list_of_tests'
    ], function(config, listOfTests) {

      // Load the test files themselves
      require( listOfTests, function() {

        // Initial the tests!
        mocha.run();
      });
  });

}());
