define([
  'jquery',
  'underscore'
], function( $, _ ){

  var TemplateStore = function(){
    this.store = {};
  };

  TemplateStore.prototype.fetch = function( name ) {
    if ( !this.store[ name ] ) {
      this.store[ name ] = $.get( '/templates/' + name ).then(function(t){
        return _.template( t );
      }).promise();
    }
    return this.store[ name ];
  };

  return TemplateStore;

});
