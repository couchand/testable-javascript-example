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

        expect(this.requests.length).to.eql(1);
        expect(this.requests[0].url).to.eql('/data/search.json?q=foo+bar');
      });

      it('returns a promise', function() {
        var promise = People.findByName('foo bar');

        expect(promise.then).to.be.a('function');
      });
    });

    describe('#empty', function() {
      it('returns true when undefined', function() {
        var p = new People();

        expect(p.isEmpty()).to.equal(true);
      });

      it('returns true when empty', function() {
        var p = new People([]);

        expect(p.isEmpty()).to.equal(true);
      });

      it('returns false when not empty', function() {
        var p = new People(['foo']);

        expect(p.isEmpty()).to.equal(false);
      });
    });

  });

});
