define([
  'jquery'
], function( $ ) {

  var LikesList = function( sel ) {
    this.el = $( sel );
  };

  LikesList.prototype.add = function( person ) {
      this.el.find( '.no-results' ).remove();
      $( '<li>', { text: person } ).appendTo( this.el );
  };

  return LikesList;

});
