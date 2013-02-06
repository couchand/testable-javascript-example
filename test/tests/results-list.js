define([
  'results-list',
  'jquery'
], function(ResultsList, $) {

  describe('ResultsList', function() {
    describe('#block', function() {
      beforeEach(function() {
        $('<ul>').appendTo( $('#test') );
      });
      afterEach(function() {
        $('#test').empty();
      });

      it('shows a searching message', function() {
        var rl = new ResultsList('#test ul');

        rl.block();

        $('#test ul').children().length.should.eql(1);
        $('#test ul').children().eq(0).text().should.match(/search/i);
      });
    });
  });
});
