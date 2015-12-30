/**
 * Created by balint on 2015. 12. 27..
 */

var EventEmitter = require('events').EventEmitter;

const EventManager = function() {
  this.counter++;
};

EventManager.prototype.emitter = new EventEmitter();
EventManager.prototype.counter = 0;
EventManager.prototype.test = 'test';

module.exports = new EventManager();