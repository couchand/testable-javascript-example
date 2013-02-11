define([
  'template-store'
], function(TemplateStore) {

  suite('TemplateStore', function() {
    suite('#fetch', function(){
      setup(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();
        var requests = this.requests = [];
        this.xhr.onCreate = function(xhr) {
          requests.push(xhr);
        };
      });
      teardown(function() {
        this.xhr.restore();
      });

      test('fetches from the correct location', function() {
        var ts = new TemplateStore();

        ts.fetch('foobar');

        assert.equal(this.requests.length, 1);
        assert.equal(this.requests[0].url, '/templates/foobar');
      });

      test('caches responses', function() {
        var ts = new TemplateStore();
        ts.fetch('foobar');

        ts.fetch('foobar');

        assert.equal(this.requests.length, 1);
      });

      test('returns a promise', function() {
        var ts = new TemplateStore();

        var fetchResult = ts.fetch('foobar');

        assert.equal(typeof fetchResult.then, 'function');
      });

      test('returns a promise for a templating function', function(done) {
        var ts = new TemplateStore();

        ts.fetch('foobar').then(function( result ) {
          assert.equal(typeof result, 'function');
          done();
        });

        this.requests[0].respond( 200, {}, 'foobar' );
      });
    });
  });
});
