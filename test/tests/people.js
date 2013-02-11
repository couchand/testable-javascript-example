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

        assert.equal(this.requests.length, 1);
        assert.equal(this.requests[0].url, '/data/search.json?q=foo+bar');
      });

      it('returns a promise', function() {
        var promise = People.findByName('foo bar');

        assert.equal(typeof promise.then, 'function');
      });
    });

    describe('#empty', function() {
      it('returns true when undefined', function() {
        var p = new People();

        assert.ok(p.isEmpty());
      });

      it('returns true when empty', function() {
        var p = new People([]);

        assert.ok(p.isEmpty());
      });

      it('returns false when not empty', function() {
        var p = new People(['foo']);

        assert.ok(!p.isEmpty());
      });
    });
  });
});
