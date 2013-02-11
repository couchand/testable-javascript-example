define([
  'semaphore'
], function(Semaphore) {

  describe('Semaphore', function() {

    describe('#raise', function() {
      it('raises the semaphore', function() {
        var s = new Semaphore();

        var didRaise = s.raise();

        assert.ok(s.isUp());
        assert.ok(didRaise);
      });

      it('returns false when already raised', function() {
        var s = new Semaphore();
        s.raise();

        var didRaise = s.raise();

        assert.ok(!didRaise);
      });
    });

    describe('#lower', function() {
      it('lowers the semaphore', function() {
        var s = new Semaphore();
        s.raise(); // to avoid unlowerable exception

        var didLower = s.lower();

        assert.ok(s.isDown());
        assert.ok(didLower);
      });

      it('returns false when already lowered', function() {
        var s = new Semaphore();

        var didLower = s.lower();

        assert.ok(!didLower);
      });
    });

    describe('#isUp', function() {
      it('returns false when lowered', function() {
        var s = new Semaphore();

        assert.ok(!s.isUp());
      });

      it('returns true when raised', function() {
        var s = new Semaphore();
        s.raise();

        assert.ok(s.isUp());
      });
    });

    describe('#isDown', function() {
      it('returns true when lowered', function() {
        var s = new Semaphore();

        assert.ok(s.isDown());
      });

      it('returns false when raised', function() {
        var s = new Semaphore();
        s.raise();

        assert.ok(!s.isDown());
      });
    });
  });
});
