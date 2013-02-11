define([
  'likes-list',
  'jquery'
], function( LikesList, $ ) {

  describe('LikesList', function() {
    describe('#add', function() {
      afterEach(function() {
        $('#test').empty();
      });

      it('adds a person', function() {
        var ll = new LikesList( '#test' );

        ll.add('foobar');

        assert.equal($('#test').children().length, 1);
        assert.equal($('#test').eq(0).text(), 'foobar');
      });

      it('only adds a person once', function() {
        var ll = new LikesList('#test');
        ll.add('foobar');

        ll.add('foobar');

        assert.equal($('#test').children().length, 1);
      });
    });
  });
});
