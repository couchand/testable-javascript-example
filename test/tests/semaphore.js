define([
  'semaphore'
], function(Semaphore) {

  suite('Semaphore', function() {

    suite('#raise', function() {
      test('raises the semaphore', function() {
        var s = new Semaphore();

        var didRaise = s.raise();

        assert.ok(s.isUp());
        assert.ok(didRaise);
      });

      test('returns false when already raised', function() {
        var s = new Semaphore();
        s.raise();

        var didRaise = s.raise();

        assert.ok(!didRaise);
      });
    });

    suite('#lower', function() {
      test('lowers the semaphore', function() {
        var s = new Semaphore();
        s.raise(); // to avoid unlowerable exception

        var didLower = s.lower();

        assert.ok(s.isDown());
        assert.ok(didLower);
      });

      test('returns false when already lowered', function() {
        var s = new Semaphore();

        var didLower = s.lower();

        assert.ok(!didLower);
      });
    });

    suite('#isUp', function() {
      test('returns false when lowered', function() {
        var s = new Semaphore();

        assert.ok(!s.isUp());
      });

      test('returns true when raised', function() {
        var s = new Semaphore();
        s.raise();

        assert.ok(s.isUp());
      });
    });

    suite('#isDown', function() {
      test('returns true when lowered', function() {
        var s = new Semaphore();

        assert.ok(s.isDown());
      });

      test('returns false when raised', function() {
        var s = new Semaphore();
        s.raise();

        assert.ok(!s.isDown());
      });
    });
  });
});
