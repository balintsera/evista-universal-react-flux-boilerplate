'use strict';

var React = require('react');
var EventsSingleton = require('../service/eventsManager.js');
var MovieStore = require('../stores/movieStore.js');

// Define all events assoctiated with this component
EventsSingleton.emitter.on('new-item', function(payload) {
  console.log('Event fired');
  // Call Store events maybe?
  // adds new element to list
  MovieStore.addItem(payload);
    // store emits 'dom_change' (or just changes state?)
});


module.exports = React.createClass({
  componentDidMount: function() {
    EventsSingleton.emitter.on('dom-change', this.updateElement);
  },

  updateElement: function() {
    // Update state
    console.log('updateElement called on add new item component');
  },

  addNew: function() {
    console.log('click');
    var newItem =  {
      "title": "A Christmas Carol cloned",
      "url": "https://en.wikipedia.org/wiki/A_Christmas_Carol_(1938_film)",
      "image": "https://upload.wikimedia.org/wikipedia/en/f/ff/CCPoster_art-1938.jpg"
    };
    EventsSingleton.emitter.emit('new-item', newItem);
  },

  render: function render() {
    return (
      <button onClick={this.addNew}>Add new</button>
    );
  }
});
