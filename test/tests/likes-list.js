define([
  'likes-list',
  'jquery'
], function( LikesList, $ ) {

  suite('LikesList', function() {
    suite('#add', function() {
      teardown(function() {
        $('#test').empty();
      });

      test('adds a person', function() {
        var ll = new LikesList( '#test' );

        ll.add('foobar');

        assert.equal($('#test').children().length, 1);
        assert.equal($('#test').eq(0).text(), 'foobar');
      });

      test('only adds a person once', function() {
        var ll = new LikesList('#test');
        ll.add('foobar');

        ll.add('foobar');

        assert.equal($('#test').children().length, 1);
      });
    });
  });
});
