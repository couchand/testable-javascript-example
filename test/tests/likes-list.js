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

        expect($('#test').children().length).to.eql(1);
        expect($('#test').eq(0).text()).to.eql('foobar');
      });

      it('only adds a person once', function() {
        var ll = new LikesList('#test');
        ll.add('foobar');

        ll.add('foobar');

        expect($('#test').children().length).to.eql(1);
      });

    });
  });

});
