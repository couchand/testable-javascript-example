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

        this.requests.length.should.eql(1);
        this.requests[0].url.should.eql('/templates/foobar');
      });

      it('caches responses', function() {
        var ts = new TemplateStore();
        ts.fetch('foobar');

        ts.fetch('foobar');

        this.requests.length.should.eql(1);
      });

    });
  });

});
