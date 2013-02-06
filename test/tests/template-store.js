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

        expect(this.requests.length).to.eql(1);
        expect(this.requests[0].url).to.eql('/templates/foobar');
      });

      it('caches responses', function() {
        var ts = new TemplateStore();
        ts.fetch('foobar');

        ts.fetch('foobar');

        expect(this.requests.length).to.eql(1);
      });

      it('returns a promise', function() {
        var ts = new TemplateStore();

        var fetchResult = ts.fetch('foobar');

        expect(fetchResult.then).to.be.a('function');
      });

      it('returns a promise for a templating function', function(done) {
        var ts = new TemplateStore();

        ts.fetch('foobar').then(function( result ) {
          expect(result).to.be.a('function');
          done();
        });

        this.requests[0].respond( 200, {}, 'foobar' );
      });

    });
  });

});
