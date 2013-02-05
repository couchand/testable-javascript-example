require([
  'template-store',
  'people',
  'likes-list',
  'results-list',
  'jquery',
  'underscore'
], function(
  TemplateStore,
  People,
  LikesList,
  ResultsList,
  $,
  _
) {
  var templates = new TemplateStore();

  $(function() {
    var results = new ResultsList( '#results' );
    var likes = new LikesList( '#liked' );
    var pending = false;

    $( '#searchForm' ).on( 'submit', function( e ) {
      e.preventDefault();

      if ( pending ) { return; }

      var form = $( this );
      var query = $.trim( form.find( 'input[name="q"]' ).val() );

      if ( !query ) { return; }

      pending = true;

      $.when(
        People.findByName( query ),
        templates.fetch('people-detailed.tmpl')
      ).then(function(p,t) {
        results.update( p[0], t[0] );
          pending = false;
      });

      results.block();
    });

    results.el.on('like', function(e, person) {
      likes.add( person );
    });

  });
});
