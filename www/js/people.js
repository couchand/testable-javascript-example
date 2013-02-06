define([
  'jquery'
], function( $ ) {

  var People = function() {};

  People.findByName = function( name ) {
    return $.ajax( '/data/search.json', {
      data : { q: name },
      dataType : 'json'
    }).then(function( data ) {
      return data.results;
    }).promise();
  };

  return People;

});
