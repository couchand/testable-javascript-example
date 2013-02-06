require([
  'template-store',
  'people',
  'likes-list',
  'results-list',
  'semaphore',
  'search-form',
  'jquery',
  'underscore'
], function(
  TemplateStore,
  People,
  LikesList,
  ResultsList,
  Semaphore,
  SearchForm,
  $,
  _
) {
  var templates = new TemplateStore();

  $(function() {
    var results = new ResultsList( '#results' );
    var likes = new LikesList( '#liked' );
    var pending = new Semaphore();
    var searchForm = new SearchForm( '#searchForm' );

    $( document ).on( 'search', function( e, name ) {
      if ( pending.isUp() ) { return; }
      pending.raise();

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
