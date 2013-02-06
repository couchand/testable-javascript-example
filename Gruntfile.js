/*global module:false*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: [ '<config:lint.files>', 'www/templates/*.tmpl' ],
      tasks: 'test'
    },
    jshint: {
      main: {
        src: ['www/js/**/*.js'],
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          browser: true,
          globals: {
            require: true,
            define: true
          }
        },
      },
      test: {
        src: ['test/tests/*.js'],
        options: {
          expr: true,
          globals: {
            beforeEach: true,
            afterEach: true,
            sinon: true,
            describe: true,
            it: true,
            expect: true
          }
        }
      }
    },
    uglify: {},
    mocha: {
      index: [ 'test/runner/index.html' ]
    }
  });

  grunt.registerTask('fixtures', 'Build template fixture', function() {
    var obj = {};

    var addFile = function(filepath, contents) {
      obj[ filepath.replace('templates/', '') ] = contents;
    };

    var options = {cwd: 'www'};

    grunt.file.expand(options, 'templates/*.tmpl').forEach(function(filepath) {
      addFile(filepath, grunt.file.read('www/' + filepath));
    });

    var src = 'define(function() { return ' + JSON.stringify(obj, null, 2) + '; });';

    grunt.file.write('test/fixtures/templates.js', src);
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('test', ['fixtures', 'mocha']);
};

