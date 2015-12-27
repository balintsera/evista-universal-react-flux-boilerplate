/*-------------------------------------------------------------------------------------------------------------------*\
|  Copyright (C) 2015 PayPal                                                                                          |
|                                                                                                                     |
|  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     |
|  with the License.                                                                                                  |
|                                                                                                                     |
|  You may obtain a copy of the License at                                                                            |
|                                                                                                                     |
|       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
|                                                                                                                     |
|  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
|  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
|  the specific language governing permissions and limitations under the License.                                     |
\*-------------------------------------------------------------------------------------------------------------------*/

'use strict';

var React = require('react');
var EventsSingleton = require('../../src/Service/events.js');
var MovieStore = require('../../src/stores/MovieStore.js');

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
