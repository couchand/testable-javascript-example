define(['semaphore'], function(Semaphore) {
  describe('Semaphore', function() {

    describe('#raise', function() {

      it('raises the semaphore', function() {
        var s = new Semaphore();

        s.raise();

        s.isUp().should.eql(true);
      });

      it('throws an error when already raised', function() {
        var s = new Semaphore();
        s.raise();

        (function() {
          s.raise();
        }).should.throwError(/raised/i);
      });

    });

    describe('#lower', function() {

      it('lowers the semaphore', function() {
        var s = new Semaphore();
        s.raise(); // to avoid unlowerable exception

        s.lower();

        s.isDown().should.eql(true);
      });

    });

  });
});
