define([
  'jquery',
  'underscore'
], function( $, _ ) {

  var Person = function( data ) {
    this.data = data;
  };

  Person.prototype.render = function( tmpl ) {
    return tmpl({ person: this.data });
  };

  return Person;

});
