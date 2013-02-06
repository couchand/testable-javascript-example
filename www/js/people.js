define([
  'person',
  'jquery',
  'underscore'
], function( Person, $, _ ) {

  var People = function( initial ) {
    this.population = !initial ? [] : $.map( initial, function( el ) {
      return new Person( el );
    });
  };

  People.prototype.isEmpty = function() {
    return !(this.population && this.population.length);
  };

  People.prototype.each = function( callback ) {
    _.each( this.population, callback );
  };

  People.findByName = function( name ) {
    return $.ajax( '/data/search.json', {
      data : { q: name },
      dataType : 'json'
    }).then(function( data ) {
      return new People( data.results );
    }).promise();
  };

  return People;

});
