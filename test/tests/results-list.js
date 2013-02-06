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

        expect($('#test ul').children().length).to.eql(1);
        expect($('#test ul').children().eq(0).text()).to.match(/search/i);
      });
    });
  });
});
