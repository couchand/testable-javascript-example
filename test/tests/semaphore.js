define([
  'semaphore'
], function(Semaphore) {

  describe('Semaphore', function() {

    describe('#raise', function() {
      it('raises the semaphore', function() {
        var s = new Semaphore();

        var didRaise = s.raise();

        expect(s.isUp()).to.eql(true);
        expect(didRaise).to.eql(true);
      });
      it('returns false when already raised', function() {
        var s = new Semaphore();
        s.raise();

        var didRaise = s.raise();

        expect(didRaise).to.eql(false);
      });
    });

    describe('#lower', function() {
      it('lowers the semaphore', function() {
        var s = new Semaphore();
        s.raise(); // to avoid unlowerable exception

        var didLower = s.lower();

        expect(s.isDown()).to.eql(true);
        expect(didLower).to.eql(true);
      });
      it('returns false when already lowered', function() {
        var s = new Semaphore();

        var didLower = s.lower();

        expect(didLower).to.eql(false);
      });
    });

    describe('#isUp', function() {
      it('returns false when lowered', function() {
        var s = new Semaphore();

        expect(s.isUp()).to.equal(false);
      });
      it('returns true when raised', function() {
        var s = new Semaphore();
        s.raise();

        expect(s.isUp()).to.equal(true);
      });
    });

    describe('#isDown', function() {
      it('returns true when lowered', function() {
        var s = new Semaphore();

        expect(s.isDown()).to.equal(true);
      });
      it('returns false when raised', function() {
        var s = new Semaphore();
        s.raise();

        expect(s.isDown()).to.equal(false);
      });
    });

  });

});
