require([
  'likes-list',
  'results-list',
  'search-form',
  'application-controller',
  'jquery'
], function( LikesList, ResultsList, SearchForm, ApplicationController, $ ) {

  $(function() {
    var controller = new ApplicationController();

    controller.registerResults( new ResultsList( '#results' ) );
    controller.registerLikes( new LikesList( '#liked' ) );
    controller.registerSearch( new SearchForm( '#searchForm' ) );
  });

});
