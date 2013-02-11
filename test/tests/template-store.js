define([
  'template-store'
], function(TemplateStore) {

  describe('TemplateStore', function() {
    describe('#fetch', function(){
      beforeEach(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();
        var requests = this.requests = [];
        this.xhr.onCreate = function(xhr) {
          requests.push(xhr);
        };
      });
      afterEach(function() {
        this.xhr.restore();
      });

      it('fetches from the correct location', function() {
        var ts = new TemplateStore();

        ts.fetch('foobar');

        assert.equal(this.requests.length, 1);
        assert.equal(this.requests[0].url, '/templates/foobar');
      });

      it('caches responses', function() {
        var ts = new TemplateStore();
        ts.fetch('foobar');

        ts.fetch('foobar');

        assert.equal(this.requests.length, 1);
      });

      it('returns a promise', function() {
        var ts = new TemplateStore();

        var fetchResult = ts.fetch('foobar');

        assert.equal(typeof fetchResult.then, 'function');
      });

      it('returns a promise for a templating function', function(done) {
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
