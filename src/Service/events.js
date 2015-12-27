/**
 * Created by balint on 2015. 12. 27..
 */
var EventEmitter = require('events').EventEmitter;

var Events = function() {
  this.counter++;
};

Events.prototype.emitter = new EventEmitter();
Events.prototype.counter = 0;


module.exports = new Events();