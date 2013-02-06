define(['search-form', 'jquery'], function(SearchForm, $) {
  describe('SearchForm', function() {
    describe('onSubmit', function() {

      beforeEach(function() {
        var form = $('<form>');
        $('<input name="q" type="text">').appendTo( form );
        $('<button type="submit">').appendTo( form );
        form.appendTo( $('#test') );

        this.searchFired = false;
        this.searchTerm = '';

        var that = this;
        $('#test').on('search', function(e, q) {
          that.searchFired = true;
          that.searchTerm = q;
        });
      });

      afterEach(function() {
        $('#test').empty();
      });

      it('does nothing with no input', function() {
        var sf = new SearchForm('#test > form');

        $('#test input').val('   ');
        $('#test button').trigger('submit');

        this.searchFired.should.eql(false);
      });

      it('performs a search with input', function() {
        var sf = new SearchForm('#test > form');

        $('#test input').val('foobar');
        $('#test button').trigger('submit');

        this.searchFired.should.eql(true);
        this.searchTerm.should.eql('foobar');
      });

    });
  });
});
