define([
  'semaphore'
], function(Semaphore) {

  describe('Semaphore', function() {

    describe('#raise', function() {
      it('raises the semaphore', function() {
        var s = new Semaphore();

        var didRaise = s.raise();

        s.isUp().should.eql(true);
        didRaise.should.eql(true);
      });

      it('returns false when already raised', function() {
        var s = new Semaphore();
        s.raise();

        var didRaise = s.raise();

        didRaise.should.eql(false);
      });
    });

    describe('#lower', function() {
      it('lowers the semaphore', function() {
        var s = new Semaphore();
        s.raise(); // to avoid unlowerable exception

        var didLower = s.lower();

        s.isDown().should.eql(true);
        didLower.should.eql(true);
      });

      it('returns false when already lowered', function() {
        var s = new Semaphore();

        var didLower = s.lower();

        didLower.should.eql(false);
      });
    });

    describe('#isUp', function() {
      it('returns false when lowered', function() {
        var s = new Semaphore();

        s.isUp().should.equal(false);
      });

      it('returns true when raised', function() {
        var s = new Semaphore();
        s.raise();

        s.isUp().should.equal(true);
      });
    });

    describe('#isDown', function() {
      it('returns true when lowered', function() {
        var s = new Semaphore();

        s.isDown().should.equal(true);
      });

      it('returns false when raised', function() {
        var s = new Semaphore();
        s.raise();

        s.isDown().should.equal(false);
      });
    });
  });
});
