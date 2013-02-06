define([
  'jquery',
  'underscore'
], function( $, _ ) {

  var People = function(initial) {
    this.population = initial;
  };

  People.prototype.isEmpty = function() {
    return !(this.population && this.population.length);
  };

  People.prototype.each = function(callback) {
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
