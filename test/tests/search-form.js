define([
  'search-form',
  'jquery'
], function(SearchForm, $) {

  suite('SearchForm', function() {
    suite('onSubmit', function() {
      setup(function() {
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
      teardown(function() {
        $('#test').empty();
      });

      test('does nothing with no input', function() {
        var sf = new SearchForm('#test > form');

        $('#test input').val('   ');
        $('#test button').trigger('submit');

        assert.ok(!this.searchFired);
      });

      test('performs a search with input', function() {
        var sf = new SearchForm('#test > form');

        $('#test input').val('foobar');
        $('#test button').trigger('submit');

        assert.ok(this.searchFired);
        assert.equal(this.searchTerm, 'foobar');
      });
    });
  });
});
