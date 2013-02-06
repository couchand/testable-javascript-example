define([
  'people'
], function(People) {

  describe('People', function() {

    describe('.findByName', function() {
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

      it('fetches from the right url', function() {
        People.findByName('foo bar');

        this.requests.length.should.eql(1);
        this.requests[0].url.should.eql('/data/search.json?q=foo+bar');
      });

      it('returns a promise', function() {
        var promise = People.findByName('foo bar');

        promise.then.should.be.a('function');
      });
    });

    describe('#empty', function() {
      it('returns true when undefined', function() {
        var p = new People();

        p.isEmpty().should.equal(true);
      });

      it('returns true when empty', function() {
        var p = new People([]);

        p.isEmpty().should.equal(true);
      });

      it('returns false when not empty', function() {
        var p = new People(['foo']);

        p.isEmpty().should.equal(false);
      });
    });
  });
});
