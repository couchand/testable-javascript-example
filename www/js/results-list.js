define([
  'jquery'
], function( $ ) {

  var ResultsList = function( sel ) {
    var el = this.el = $( sel );

    el.on( 'click', '.like', function( e ) {
      e.preventDefault();
      var name = $( this ).closest( 'li' ).find( 'h2' ).text();
      el.trigger( 'like', name );
    });
  };

  ResultsList.prototype.update = function( data, tmpl ) {
    this.el.html( tmpl({ people : data }) );
  };

  ResultsList.prototype.block = function() {
    $('<li>', {
      'class' : 'searching',
      html : 'Searching &hellip;'
    }).appendTo( this.el.empty() );
  };

  return ResultsList;

});
