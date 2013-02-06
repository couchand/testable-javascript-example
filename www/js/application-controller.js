define([
  'template-store',
  'people',
  'semaphore',
  'jquery'
], function( TemplateStore, People, Semaphore, $ ) {

  var ApplicationController = function() {
    this.templates = new TemplateStore();
    this.pending = new Semaphore();
    var me = this;

    $( document ).on( 'search', function( e, name ) {
      if ( !me.pending.raise() ) { return; }

      var peopleFound = People.findByName( name );
      var listTemplateFetched = me.templates.fetch('people-detailed.tmpl');
      var itemTemplateFetched = me.templates.fetch('person-detailed.tmpl');

      $.when(
        peopleFound,
        listTemplateFetched,
        itemTemplateFetched
      ).done(
        $.proxy( me.results, 'update' )
      ).always(
        $.proxy( me.pending, 'lower' )
      );

      me.results.block();
    });

    $( document ).on('like', function( e, person ) {
      me.likes.add( person );
    });
  };

  ApplicationController.prototype.registerResults = function( results ) {
    this.results = results;
  };

  ApplicationController.prototype.registerLikes = function( likes ) {
    this.likes = likes;
  };

  ApplicationController.prototype.registerSearch = function( search ) {
    this.search = search;
  };

  return ApplicationController;

});
