define([
  'likes-list',
  'template-store',
  'jquery'
], function( LikesList, TemplateStore, $ ) {

  describe('LikesList', function() {
    beforeEach(function() {
      var that = this;
      this.template = '<% people.each(function(person) { %><li><%= person.name %><li><% }); %>';
    });
    describe('#add', function() {

      afterEach(function() {
        $('#test').empty();
      });

      it('adds a person', function() {
        var ll = new LikesList( '#test' );

        ll.add( 'foobar', this.template );

        $('#test').children().length.should.eql(1);
        $('#test').eq(0).text().should.eql('foobar');
      });

      it('only adds a person once', function() {
        var ll = new LikesList( '#test' );
        ll.add( 'foobar', this.template );

        ll.add( 'foobar', this.template );

        $('#test').children().length.should.eql(1);
      });

    });
  });

});
