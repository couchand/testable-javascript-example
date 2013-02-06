define([
  'jquery'
], function( $ ) {

  var LikesList = function( sel ) {
    this.el = $( sel );
    this.likes = [];
  };

  LikesList.prototype.add = function( person ) {
    if ( -1 === this.likes.indexOf( person ) ) {
      this.el.find( '.no-results' ).remove();
      this.likes.push( person );
      $( '<li>', { text: person } ).appendTo( this.el );
    }
  };

  return LikesList;

});
