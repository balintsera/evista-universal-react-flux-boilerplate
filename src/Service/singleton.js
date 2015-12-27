/**
 * Created by balint on 2015. 12. 27..
 */


var Singleton = function(){
  this.counter++;
};

Singleton.prototype.counter = 0;

Singleton.prototype.collection = [];

Singleton.prototype.addToCollection = function (element) {
  this.collection.push(element);
};

module.exports = new Singleton();