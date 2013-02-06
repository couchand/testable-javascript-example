require([
  'template-store',
  'people',
  'likes-list',
  'results-list',
  'semaphore',
  'jquery',
  'underscore'
], function(
  TemplateStore,
  People,
  LikesList,
  ResultsList,
  Semaphore,
  $,
  _
) {
  var templates = new TemplateStore();

  $(function() {
    var results = new ResultsList( '#results' );
    var likes = new LikesList( '#liked' );
    var pending = new Semaphore();

    $( '#searchForm' ).on( 'submit', function( e ) {
      e.preventDefault();

      if ( pending.isUp() ) { return; }

      var form = $( this );
      var query = $.trim( form.find( 'input[name="q"]' ).val() );

      if ( !query ) { return; }

      pending.raise();

      var peopleFound = People.findByName( query );
      var templatesFetched = templates.fetch('people-detailed.tmpl');

      $.when(
        peopleFound,
        templatesFetched
      ).done(
        $.proxy( results, 'update' )
      ).always(
        $.proxy( pending, 'lower' )
      );

      results.block();
    });

    results.el.on('like', function(e, person) {
      likes.add( person );
    });

  });
});
