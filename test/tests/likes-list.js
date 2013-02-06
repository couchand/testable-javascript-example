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

        $('#test').children().length.should.eql(1);
        $('#test').eq(0).text().should.eql('foobar');
      });

      it('only adds a person once', function() {
        var ll = new LikesList('#test');
        ll.add('foobar');

        ll.add('foobar');

        $('#test').children().length.should.eql(1);
      });
    });
  });
});
