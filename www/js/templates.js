define(['jquery'], function($){
  var Templates = function(){
    this.store = {};
  };

  Templates.prototype.fetch = function(name) {
    if ( !this.store[ name ] ) {
      this.store[ name ] = $.get( '/templates/' + name );
    }
    return this.store[ name ];
  };

  return Templates;
});
