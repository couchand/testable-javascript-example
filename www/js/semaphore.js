define([], function() {

  var Semaphore = function() {
    this.state = false;
  };

  Semaphore.prototype.isUp = function() {
    return this.state;
  };

  Semaphore.prototype.isDown = function() {
    return !this.state;
  };

  Semaphore.prototype.raise = function() {
    if ( this.state ) {
      return false;
    }
    this.state = true;
    return true;
  };

  Semaphore.prototype.lower = function() {
    if ( !this.state ) {
      return false;
    }
    this.state = false;
    return true;
  };

  return Semaphore;

});
