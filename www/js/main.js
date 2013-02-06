require([
  'template-store',
  'people',
  'likes-list',
  'results-list',
  'semaphore',
  'search-form',
  'jquery'
], function(
  TemplateStore,
  People,
  LikesList,
  ResultsList,
  Semaphore,
  SearchForm,
  $
) {
  var templates = new TemplateStore();
  var pending = new Semaphore();

  $(function() {
    var results = new ResultsList( '#results' );
    var likes = new LikesList( '#liked' );
    var searchForm = new SearchForm( '#searchForm' );

    $( document ).on( 'search', function( e, name ) {
      if ( !pending.raise() ) { return; }

      var peopleFound = People.findByName( name );
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

    $( document ).on('like', function(e, person) {
      likes.add( person );
    });

  });
});
