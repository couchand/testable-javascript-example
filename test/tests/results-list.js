define([
  'results-list',
  'jquery'
], function(ResultsList, $) {

  suite('ResultsList', function() {
    suite('#block', function() {
      setup(function() {
        $('<ul>').appendTo( $('#test') );
      });
      teardown(function() {
        $('#test').empty();
      });

      test('shows a searching message', function() {
        var rl = new ResultsList('#test ul');

        rl.block();

        assert.equal($('#test ul').children().length, 1);
        assert.ok($('#test ul').children().eq(0).text().match(/search/i));
      });
    });
  });
});
