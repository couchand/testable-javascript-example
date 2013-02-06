require([
  'likes-list',
  'results-list',
  'search-form',
  'application-controller',
  'jquery'
], function( LikesList, ResultsList, SearchForm, ApplicationController, $ ) {

  $(function() {
    var results = new ResultsList( '#results' );
    var likes = new LikesList( '#liked' );
    var searchForm = new SearchForm( '#searchForm' );
    var controller = new ApplicationController();

    controller.registerResults( results );
    controller.registerLikes( likes );
    controller.registerSearch( searchForm );

  });

});
