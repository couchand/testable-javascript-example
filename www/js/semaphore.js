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
      throw new Error('tried to raise a raised semaphor');
    }
    this.state = true;
  };

  Semaphore.prototype.lower = function() {
    if ( !this.state ) {
      throw 'tried to lower a lowered semaphore';
    }
    this.state = false;
  };

  return Semaphore;

});
