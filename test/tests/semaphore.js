define(['semaphore'], function(Semaphore) {
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

  });
});
