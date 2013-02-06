define(['jquery'], function($) {

  var SearchForm = function(sel) {
    var el = this.el = $( sel );

    el.on('submit', function(e) {
      e.preventDefault();

      var query = $.trim( el.find( 'input[name="q"]' ).val() );

      if ( !query ) { return; }

      el.trigger( 'search', query );
    });
  };

  return SearchForm;

});
