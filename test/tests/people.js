define([
  'people'
], function(People) {

  suite('People', function() {

    suite('.findByName', function() {
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

      test('fetches from the right url', function() {
        People.findByName('foo bar');

        assert.equal(this.requests.length, 1);
        assert.equal(this.requests[0].url, '/data/search.json?q=foo+bar');
      });

      test('returns a promise', function() {
        var promise = People.findByName('foo bar');

        assert.equal(typeof promise.then, 'function');
      });
    });

    suite('#empty', function() {
      test('returns true when undefined', function() {
        var p = new People();

        assert.ok(p.isEmpty());
      });

      test('returns true when empty', function() {
        var p = new People([]);

        assert.ok(p.isEmpty());
      });

      test('returns false when not empty', function() {
        var p = new People(['foo']);

        assert.ok(!p.isEmpty());
      });
    });
  });
});
