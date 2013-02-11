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

        assert.equal($('#test ul').children().length, 1);
        assert.ok($('#test ul').children().eq(0).text().match(/search/i));
      });
    });
  });
});
