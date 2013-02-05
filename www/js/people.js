define(['jquery'], function($) {

  var People = function() {};

  People.findByName = function(name) {
    return $.ajax( '/data/search.json', {
      data : { q: name },
      dataType : 'json'
    });
  };

  return People;

});
