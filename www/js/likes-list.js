define([
  'jquery',
  'underscore'
], function( $, _ ) {

  var LikesList = function( sel ) {
    this.el = $( sel );
    this.likes = [];
  };

  LikesList.prototype.add = function( person, t ) {
    if ( -1 === this.likes.indexOf( person ) ) {
      this.el.find( '.no-results' ).remove();
      this.likes.push( person );
      this.render( t );
    }
  };

  LikesList.prototype.render = function( t ) {
    var tmpl = _.template( t );
    this.el.html( tmpl({ people: this.likes }) );
  };

  return LikesList;

});
